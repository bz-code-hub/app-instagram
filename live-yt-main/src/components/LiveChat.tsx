import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { chatConfig, comments } from "@/config/livestream-config";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface ChatMessage {
  id: string;
  user: string;
  initials: string;
  message: string;
  color: string;
}

const getRandomColor = () => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.map(p => p[0]).join("").toUpperCase().slice(0, 2);
};

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
}

export const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Initialize with first few comments
    return comments.slice(0, chatConfig.visibleComments).map((comment, index) => ({
      id: `msg-initial-${index}`,
      user: comment.user,
      initials: getInitials(comment.user),
      message: comment.message,
      color: getRandomColor(),
    }));
  });
  const [inputValue, setInputValue] = useState("");
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const emojiIdCounter = useRef(0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-user`,
        user: "Anonymous User",
        initials: "AU",
        message: inputValue.trim(),
        color: "bg-gray-500",
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue("");
    }
  };

  const addFloatingEmoji = (emoji: string) => {
    const newEmoji: FloatingEmoji = {
      id: emojiIdCounter.current++,
      emoji,
      left: Math.random() * 60 + 20, // Random position between 20% and 80%
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);

    // Remove emoji after animation (3 seconds)
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 3000);
  };

  useEffect(() => {
    let currentIndex = chatConfig.visibleComments;
    let timeout: NodeJS.Timeout;

    const scheduleNextComment = () => {
      if (currentIndex >= comments.length) {
        // Reached the end of comments
        if (chatConfig.loopComments) {
          // Loop back to start
          currentIndex = 0;
        } else {
          // Stop adding comments
          return;
        }
      }

      const comment = comments[currentIndex];
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-${currentIndex}`,
        user: comment.user,
        initials: getInitials(comment.user),
        message: comment.message,
        color: getRandomColor(),
      };

      setMessages(prev => [...prev, newMessage]);
      currentIndex++;

      // Schedule next comment
      timeout = setTimeout(scheduleNextComment, chatConfig.commentInterval * 1000);
      timeoutsRef.current.push(timeout);
    };

    // Start scheduling comments after initial interval
    timeout = setTimeout(scheduleNextComment, chatConfig.commentInterval * 1000);
    timeoutsRef.current.push(timeout);

    // Cleanup all timeouts on unmount
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <>
      {/* Instagram Comments - Left side */}
      <div className="absolute left-3 bottom-32 z-10 pointer-events-none flex flex-col gap-2.5 w-auto">
        {messages.slice(-chatConfig.visibleComments).map((msg) => (
          <div
            key={msg.id}
            className="flex items-start gap-2 animate-fade-in group hover:scale-105 transition-transform duration-200"
          >
            {/* User Avatar with shadow */}
            <div className={`w-7 h-7 rounded-full ${msg.color} flex items-center justify-center text-white text-[8px] font-bold border-2 border-white/50 flex-shrink-0 mt-0.5 shadow-lg`}>
              {msg.initials}
            </div>

            {/* Message bubble - Instagram refined */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-2 max-w-[220px] transition-all duration-200 shadow-md">
              <p className="text-[13px] text-white leading-snug">
                <span className="font-bold text-white block">{msg.user.split(' ')[0]}</span>
                <span className="font-normal text-white/85 block">{msg.message}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Emojis Animation */}
      {floatingEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute bottom-32 z-15 pointer-events-none animate-float-up"
          style={{
            left: `${emoji.left}%`,
            animation: 'float-up 3s ease-out forwards',
          }}
        >
          <span className="text-3xl drop-shadow-lg">{emoji.emoji}</span>
        </div>
      ))}

      {/* Instagram Live Input Bar - Refined Design */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black to-black/30 py-3 px-4 pointer-events-auto safe-area-bottom flex items-center justify-between">
        {/* Input and Action Buttons */}
        <div className="flex items-center gap-3 flex-1">
          {/* Input field - Refined Instagram style */}
          <form onSubmit={handleSendMessage} className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Say something..."
              className="bg-white/15 backdrop-blur-sm text-white placeholder:text-white/35 border border-white/20 rounded-full h-12 px-4 text-xs focus:bg-white/20 focus:border-white/40 focus:ring-0 focus:ring-pink-500 transition-all duration-300 focus:outline-none hover:bg-white/20"
            />
          </form>
        </div>

        {/* Action Buttons - Instagram style with animations - Right side */}
        <div className="flex items-center gap-2 ml-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/15 active:scale-90 transition-all duration-200 group"
            title="Add more"
          >
            <span className="text-white text-xl font-bold group-hover:scale-125 transition-transform duration-200">+</span>
          </button>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/15 active:scale-90 transition-all duration-200 group"
            title="Comments"
          >
            <MessageCircle className="w-5 h-5 text-white/60 group-hover:text-white/100 group-hover:scale-125 transition-all duration-200" />
          </button>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/15 active:scale-90 transition-all duration-200 group"
            title="Share"
          >
            <Share2 className="w-5 h-5 text-white/60 group-hover:text-white/100 group-hover:scale-125 transition-all duration-200" />
          </button>

          <button
            onClick={() => addFloatingEmoji('❤️')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500/20 active:scale-90 transition-all duration-200 group"
            title="Send heart"
          >
            <Heart className="w-5 h-5 text-red-400 group-hover:text-red-500 group-hover:fill-red-500 group-hover:scale-125 transition-all duration-200" />
          </button>
        </div>
      </div>
    </>
  );
};
