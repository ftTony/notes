import { create } from "zustand";

type SingleQuote = {
    code: string;
    price: number;
    change: number;
    volume: number;
}

interface QuoteState {
    quoteMap: Record<string, SingleQuote>;
    updateQuote: (code: string, data: SingleQuote) => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
    quoteMap: {},
    updateQuote: (code, data) => set((state) => ({
        quoteMap: { ...state.quoteMap, [code]: data }
    }))
}));