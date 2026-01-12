// Static service - No AI used

export const generateBirthdayWish = async (name?: string): Promise<string> => {
  const recipient = name || "My Best Friend";
  return `Happy Birthday ${recipient}! You are paws-itively amazing! Let's party!`;
};

export const generateCardTexture = async (): Promise<string | null> => {
    // Return a static festive texture URL
    return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop";
};