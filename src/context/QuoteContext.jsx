import React, { createContext, useContext, useState, useCallback } from "react";

const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback((machine) => {
    setItems((prev) =>
      prev.find((m) => m.id === machine.id) ? prev : [...prev, machine]
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const clearItems = useCallback(() => setItems([]), []);

  const isInQuote = useCallback(
    (id) => items.some((m) => m.id === id),
    [items]
  );

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,
        isInQuote,
        drawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
};
