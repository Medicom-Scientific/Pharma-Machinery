import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
  ShoppingCart,
  Package,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/context/QuoteContext";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMPTY_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-foreground tracking-wide uppercase">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function inputClass(extra = "") {
  return `w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${extra}`;
}

export default function QuoteDrawer() {
  const { items, removeItem, clearItems, drawerOpen, closeDrawer } = useQuote();
  const [step, setStep] = useState(1); // 1 = items, 2 = contact
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  // Reset to step 1 when drawer closes
  useEffect(() => {
    if (!drawerOpen) {
      const t = setTimeout(() => {
        setStep(1);
        if (sent) {
          setSent(false);
          setForm(EMPTY_FORM);
        }
        setSendError("");
        setErrors({});
      }, 400);
      return () => clearTimeout(t);
    }
  }, [drawerOpen, sent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    return e;
  };

  const buildQuoteText = () =>
    items
      .map(
        (m, i) =>
          `${i + 1}. ${m.brand} ${m.model} — ${m.type}\n   SKU: ${m.sku} | Category: ${m.category} | Location: ${m.location}`
      )
      .join("\n\n");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSending(true);
    setSendError("");

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      company: form.company || "—",
      phone: form.phone || "—",
      message: form.message || "—",
      quote_items: buildQuoteText(),
      item_count: items.length,
      reply_to: form.email,
    };

    // If EmailJS is not configured, fall back to mailto
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const body = encodeURIComponent(
        `Quote Request from ${form.name}\nCompany: ${form.company || "—"}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\n\nMachines:\n${buildQuoteText()}\n\nMessage: ${form.message || "—"}`
      );
      window.open(`mailto:?subject=Quote Request - ${items.length} Machine(s)&body=${body}`);
      setSending(false);
      setSent(true);
      clearItems();
      return;
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSent(true);
      clearItems();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError("Failed to send. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  const content = (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-50 w-full max-w-md bg-card shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground leading-tight">
                    {step === 1 ? "Your Quote" : "Your Details"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {step === 1
                      ? `${items.length} machine${items.length !== 1 ? "s" : ""} selected`
                      : "Step 2 of 2"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step indicator */}
            {!sent && (
              <div className="flex px-6 py-3 gap-2 shrink-0 border-b border-border/50">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 flex items-center gap-2 ${s > 1 ? "justify-end" : ""}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        step >= s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    <span
                      className={`text-xs font-medium transition-all ${
                        step >= s ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s === 1 ? "Select Machines" : "Contact Info"}
                    </span>
                    {s === 1 && (
                      <div
                        className={`flex-1 h-px mx-1 transition-all ${
                          step >= 2 ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full px-6 py-12 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Quote Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Thank you, {form.name}. We'll review your request and
                        get back to you at{" "}
                        <span className="font-medium text-foreground">
                          {form.email}
                        </span>{" "}
                        shortly.
                      </p>
                    </div>
                    <Button
                      onClick={closeDrawer}
                      className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Continue Browsing
                    </Button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="px-6 py-4"
                  >
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Your quote is empty
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Browse the catalog and click{" "}
                          <span className="font-semibold">Add to Quote</span> on
                          any machine
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={closeDrawer}
                          className="mt-2"
                        >
                          Browse Catalog
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map((machine) => (
                          <div
                            key={machine.id}
                            className="flex items-start gap-3 p-3 rounded-xl border border-border bg-muted/30 group"
                          >
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                              {machine.image ? (
                                <img
                                  src={machine.image}
                                  alt={machine.model}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-muted-foreground/40" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">
                                {machine.brand}
                              </p>
                              <p className="text-sm font-semibold text-foreground leading-tight truncate">
                                {machine.model}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {machine.type}
                              </p>
                              <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                                SKU: {machine.sku}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(machine.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground/50 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        {items.length > 1 && (
                          <button
                            onClick={clearItems}
                            className="text-xs text-muted-foreground hover:text-red-500 transition-colors w-full text-center py-1"
                          >
                            Clear all machines
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="px-6 py-4"
                  >
                    <form
                      id="quote-form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Summary reminder */}
                      <div className="rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
                        <p className="text-xs text-muted-foreground">
                          Requesting a quote for{" "}
                          <span className="font-semibold text-foreground">
                            {items.length} machine{items.length !== 1 ? "s" : ""}
                          </span>
                          : {items.map((m) => `${m.brand} ${m.model}`).join(", ")}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <Field label="Full Name" required>
                            <input
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Jane Smith"
                              className={inputClass(
                                errors.name ? "border-red-400 ring-1 ring-red-400" : ""
                              )}
                            />
                            {errors.name && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.name}
                              </p>
                            )}
                          </Field>
                        </div>
                        <div className="col-span-2">
                          <Field label="Company">
                            <input
                              name="company"
                              value={form.company}
                              onChange={handleChange}
                              placeholder="Acme Pharma Ltd."
                              className={inputClass()}
                            />
                          </Field>
                        </div>
                        <div className="col-span-2">
                          <Field label="Email Address" required>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="jane@example.com"
                              className={inputClass(
                                errors.email ? "border-red-400 ring-1 ring-red-400" : ""
                              )}
                            />
                            {errors.email && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.email}
                              </p>
                            )}
                          </Field>
                        </div>
                        <div className="col-span-2">
                          <Field label="Phone Number">
                            <input
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+1 (555) 000-0000"
                              className={inputClass()}
                            />
                          </Field>
                        </div>
                        <div className="col-span-2">
                          <Field label="Additional Notes">
                            <textarea
                              name="message"
                              value={form.message}
                              onChange={handleChange}
                              rows={3}
                              placeholder="Any specific requirements, quantities, or questions..."
                              className={inputClass("resize-none")}
                            />
                          </Field>
                        </div>
                      </div>

                      {sendError && (
                        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                          <p className="text-xs text-red-600">{sendError}</p>
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            {!sent && (
              <div className="px-6 py-4 border-t border-border bg-card shrink-0">
                {step === 1 ? (
                  <Button
                    onClick={() => setStep(2)}
                    disabled={items.length === 0}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11"
                  >
                    Continue to Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="gap-1.5"
                      disabled={sending}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      form="quote-form"
                      disabled={sending}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Quote Request
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
