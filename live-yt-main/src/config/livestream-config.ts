/**
 * ⚙️ LIVESTREAM CONFIGURATION
 *
 * This file centralizes ALL editable settings for your livestream.
 * Edit here to fully customize your live broadcast!
 */

// ═══════════════════════════════════════════════════════════════
// 📹 VIDEO CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export const videoConfig = {
  // 🎬 VIDEO TYPE
  // Choose: "youtube", "panda", "vturb", "vimeo" or "direct"
  videoType: "youtube" as "youtube" | "panda" | "vturb" | "vimeo" | "direct",

  // 📹 YOUTUBE: Paste the complete video URL or just the video ID
  // Examples:
  //   Full URL: "https://www.youtube.com/watch?v=TkRmrPQDPFw"
  //   Short URL: "https://youtu.be/TkRmrPQDPFw"
  //   Shorts: "https://www.youtube.com/shorts/VsWdwMfr6A0"
  //   Just ID: "TkRmrPQDPFw"
  videoId: "https://www.youtube.com/shorts/VsWdwMfr6A0",

  // 🐼 PANDA VIDEO: Paste the complete embed code provided by Panda Video
  // Example: <div style="position:relative;padding-top:75%;"><iframe id="panda-xxxxx"...></iframe></div>
  // IMPORTANT: Use backticks (`) to paste code with quotes. Example:
  // pandaEmbedCode: `<div style="position:relative">...</div>`,
  pandaEmbedCode: ``,

  // 📺 VTURB: Paste the entire script provided by Vturb
  // Example: <div id="vid_xxxxxxxxx" style="..."></div><script...></script>
  // IMPORTANT: Use backticks (`) to paste code with quotes. Example:
  // vturbScript: `<div id="vid_xxx">...</div><script>...</script>`,
  vturbScript: ``,

  // 🎥 VIMEO: Paste the complete embed code provided by Vimeo
  // Example: <div style="padding:216.7% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/..."...></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
  // IMPORTANT: Use backticks (`) to paste code with quotes. Example:
  // vimeoEmbedCode: `<div style="padding:216.7% 0 0 0;position:relative;">...</div>`,
  vimeoEmbedCode: ``,

  // 🔗 DIRECT LINK: Paste a direct link to your video file
  // Example: https://s3.video1,com.mp4
  // Supports: MP4, WebM, OGG
  directVideoUrl: "",

  // 📊 Live viewer configuration
  viewers: {
    // Initial viewer count
    initialCount: 2402,

    // 📉 VIEWER DROP CONFIGURATION
    // Set to true to enable viewer drop effect, false to keep constant viewers
    enableViewerDrop: true,

    // Viewers BEFORE the drop (range) - only used if enableViewerDrop is true
    beforeDrop: {
      min: 2500,
      max: 3000,
    },

    // Viewers AFTER the drop (range) - only used if enableViewerDrop is true
    afterDrop: {
      min: 100,
      max: 120,
    },

    // ⏱️ Time in SECONDS when viewer drop occurs
    // (198 seconds = 3 minutes and 18 seconds) - only used if enableViewerDrop is true
    dropTimeInSeconds: 10,

    // Update interval (in milliseconds)
    updateInterval: 3000,
  },
};

// ═══════════════════════════════════════════════════════════════
// 👤 CHANNEL CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export const channelConfig = {
  // Channel name
  name: "Nutra Life",

  // Initials displayed in avatar (2 letters)
  initials: "MC",

  // 🖼️ Profile image URL (optional)
  // Simply name your image "profile" with any extension (jpg, jpeg, png, gif, webp)
  // Place it in /public/images/ folder
  // The system will automatically detect: profile.jpg, profile.jpeg, profile.png, etc.
  // Or specify a custom path: "/images/your-image.jpg"
  // Leave empty "" to use initials
  profileImageUrl: "profile",

};

// ═══════════════════════════════════════════════════════════════
// 🔘 CALL TO ACTION BUTTON CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export const ctaButtonConfig = {
  // Enable/disable button
  enabled: true,

  // Button text
  text: "Tap the button!",

  // Delay in seconds before button appears
  delayInSeconds: 20,

  // Button link/URL
  link: "https://example.com",

  // 🎨 BUTTON COLOR (choose ONE - set to true)
  color: {
    red: true,
    blue: false,
    gray: false,
    black: false,
    white: false,  // Default
  },

  // ✨ BUTTON EFFECTS (choose ONE or MORE - set to true)
  effects: {
    pulse: false,      // Pulsing effect
    glow: false,      // Glowing border effect
    shake: false,     // Shaking effect
    bounce: true,    // Bouncing effect
    float: false,     // Floating up/down effect
  },

  // 🎯 BUTTON ICON (choose ONE - set to true)
  icon: {
    click: false,       // Click/pointer icon (default)
    gift: true,       // Gift icon
    tag: false,        // Tag icon (offer/discount)
    trending: false,   // Trending up icon (opportunity)
    sparkles: false,   // Sparkles icon (special/highlight)
  },
};

// ═══════════════════════════════════════════════════════════════
// 💬 CHAT CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export const chatConfig = {
  // 📱 How many comments to show on screen at once
  visibleComments: 5,

  // ⏱️ Interval between comments (in seconds)
  // Set to 1 for comments to appear every 1 second
  // Set to 2 for comments to appear every 2 seconds, etc.
  commentInterval: 1,

  // 🔄 Loop comments
  // If true, after the last comment it will restart from the first one
  // If false, comments stop after the last one
  loopComments: true,
};

// ═══════════════════════════════════════════════════════════════
// 📝 CHAT COMMENTS (SIMPLE LIST WITH TIMING)
// ═══════════════════════════════════════════════════════════════

/**
 * 💡 HOW TO EDIT COMMENTS:
 *
 * Each comment has 2 fields:
 * - user: User name (string)
 * - message: Comment text (string)
 *
 * Comments appear automatically based on the "commentInterval"
 * setting in chatConfig (default: 1 second between each comment)
 *
 * Example:
 * { user: "John Doe", message: "Great stream!" }
 */

export const comments = [
  { user: "Margaret Wilson", message: "I've already tried it and it really works!" },
{ user: "Patricia Brown", message: "Can someone send me the link please?" },
{ user: "Linda Garcia", message: "My friend is using it and getting great results" },
{ user: "Barbara Martinez", message: "Where can I buy this?" },
{ user: "Susan Rodriguez", message: "Does it really work though?" },
{ user: "Jessica Davis", message: "It looks really good!" },
{ user: "Sarah Miller", message: "This one is amazing!" },
{ user: "Karen Anderson", message: "My friend used it and loved it" },
{ user: "Nancy Taylor", message: "I need this for my neuropathy" },
{ user: "Lisa Thomas", message: "My sister recommended this to me" },
{ user: "Betty Jackson", message: "Finally something that helps!" },
{ user: "Helen White", message: "Is this available in stores?" },
{ user: "Sandra Harris", message: "My neighbor swears by this" },
{ user: "Dorothy Clark", message: "I've been looking for something like this" },
{ user: "Ashley Lewis", message: "Does anyone have experience with this?" },
{ user: "Kimberly Walker", message: "My feet feel so much better!" },
{ user: "Emily Hall", message: "Is there a discount for first-time buyers?" },
{ user: "Donna Allen", message: "This helped my tingling so much" },
{ user: "Michelle Young", message: "Where's the best place to order?" },
{ user: "Carol King", message: "My friend said this changed her life" },
{ user: "Amanda Wright", message: "I'm ordering this today" },
{ user: "Melissa Scott", message: "Does it help with burning sensation?" },
{ user: "Deborah Green", message: "My sister uses this daily" },
{ user: "Stephanie Adams", message: "This really seems promising" },
{ user: "Rebecca Baker", message: "Anyone know if this is safe?" },
{ user: "Laura Nelson", message: "My doctor even approved this!" },
{ user: "Sharon Carter", message: "I can finally sleep through the night" },
{ user: "Cynthia Mitchell", message: "How long before you see results?" },
{ user: "Kathleen Perez", message: "My friend gave me a sample, it's wonderful" },
{ user: "Amy Roberts", message: "This is the real deal" },
{ user: "Shirley Turner", message: "Where do I find this product?" },
{ user: "Angela Phillips", message: "I've tried everything, hoping this works" },
{ user: "Brenda Campbell", message: "My cousin uses this and loves it" },
{ user: "Pamela Parker", message: "Does it work for diabetic neuropathy?" },
{ user: "Nicole Evans", message: "This looks very promising!" },
{ user: "Emma Edwards", message: "I just ordered mine" },
{ user: "Samantha Collins", message: "My feet pain is so much better now" },
{ user: "Katherine Stewart", message: "Is this all natural?" },
{ user: "Christine Sanchez", message: "My best friend recommended this" },
{ user: "Debra Morris", message: "I need the purchase link please" },
{ user: "Rachel Rogers", message: "This product is excellent!" },
{ user: "Catherine Reed", message: "Does it really reduce the pain?" },
{ user: "Carolyn Cook", message: "My neighbor is using it with great success" },
{ user: "Janet Morgan", message: "I'm so glad I found this" },
{ user: "Ruth Bell", message: "My sister said this is amazing" },
{ user: "Maria Murphy", message: "Where can I get this?" },
{ user: "Heather Bailey", message: "This seems too good to be true!" },
{ user: "Diane Rivera", message: "My friend uses it and feels so much better" },
{ user: "Virginia Cooper", message: "I've been using this for 2 weeks, love it!" },
{ user: "Julie Richardson", message: "Does anyone have the website link?" },
{ user: "Joyce Cox", message: "This helped my numbness so much" },
{ user: "Victoria Howard", message: "My feet don't hurt anymore!" },
{ user: "Kelly Ward", message: "Is there a money-back guarantee?" },
{ user: "Christina Torres", message: "My friend swears this saved her" },
{ user: "Lauren Peterson", message: "I'm ordering this right now" },
{ user: "Joan Foster", message: "Does it work quickly?" },
{ user: "Evelyn Russell", message: "This is a game changer!" },
{ user: "Judith Griffin", message: "My sister told me about this" },
{ user: "Megan Hayes", message: "I can walk without pain now" },
{ user: "Cheryl Myers", message: "Where's the official website?" },
{ user: "Andrea Ford", message: "My friend uses this every day" },
{ user: "Hannah James", message: "This product is wonderful" },
{ user: "Jacqueline Watson", message: "Does it help with leg pain too?" },
{ user: "Martha Brooks", message: "I've tried it and it's amazing!" },
{ user: "Gloria Kelly", message: "My neighbor recommended this" },
{ user: "Teresa Sanders", message: "Is this FDA approved?" },
{ user: "Ann Price", message: "My friend had great results" },
{ user: "Sara Bennett", message: "I need this so badly" },
{ user: "Madison Wood", message: "This looks really effective" },
{ user: "Kathryn Barnes", message: "My sister is using it with success" },
{ user: "Janice Ross", message: "Where do I buy this?" },
{ user: "Jean Henderson", message: "This helped my neuropathy so much!" },
{ user: "Abigail Coleman", message: "My friend told me I have to try this" },
{ user: "Olivia Jenkins", message: "Does it come with instructions?" },
{ user: "Rose Perry", message: "I'm ordering this today!" },
{ user: "Theresa Powell", message: "My cousin uses this and loves it" },
{ user: "Beverly Long", message: "This is exactly what I need" },
{ user: "Denise Patterson", message: "My friend said this works wonders" },
{ user: "Tammy Hughes", message: "Is there a subscription option?" },
{ user: "Irene Flores", message: "I've been using this for a month now" },
{ user: "Jane Washington", message: "My feet feel normal again!" },
{ user: "Lori Butler", message: "Does anyone have the link?" },
{ user: "Rachel Simmons", message: "My sister recommended this highly" },
{ user: "Marilyn Foster", message: "This product is incredible" },
{ user: "Andrea Bryant", message: "I can finally walk pain-free" },
{ user: "Kathryn Alexander", message: "My friend uses this daily" },
{ user: "Louise Russell", message: "Where can I purchase this?" },
{ user: "Sara Griffin", message: "This really works!" },
{ user: "Anne Diaz", message: "My neighbor told me about this" },
{ user: "Jacqueline Hayes", message: "I'm so happy I found this" },
{ user: "Wanda Myers", message: "Does it help with burning feet?" },
{ user: "Bonnie Ford", message: "My friend has amazing results" },
{ user: "Julia Reynolds", message: "This is the best product ever" },
{ user: "Ruby Hamilton", message: "I need the website link please" },
{ user: "Lois Graham", message: "My sister swears by this" },
{ user: "Tina Sullivan", message: "This helped my pain immediately" },
{ user: "Phyllis Wallace", message: "Is this safe for seniors?" },
{ user: "Norma Woods", message: "My friend uses it and feels great" },
{ user: "Paula Cole", message: "I'm ordering mine now" },
{ user: "Diana West", message: "This product is amazing!" },
{ user: "Annie Jordan", message: "My neighbor recommended this highly" },
{ user: "Lillian Owens", message: "Does it work for everyone?" },
{ user: "Emily Reynolds", message: "I've tried it and love it" },
{ user: "Robin Chapman", message: "My friend said this is a miracle" },
{ user: "Peggy Mason", message: "Where do I get this product?" },
{ user: "Crystal Dixon", message: "This really helps with tingling" },
{ user: "Gladys Hunt", message: "My sister uses this every day" },
{ user: "Rita Silva", message: "I can sleep better now!" },
{ user: "Dawn Pearson", message: "Is there a trial size?" },
{ user: "Connie Foster", message: "My friend had excellent results" },
{ user: "Florence Day", message: "This is wonderful!" },
{ user: "Tracy Chambers", message: "My neighbor loves this product" },
{ user: "Edna Austin", message: "Does it work on hands too?" },
{ user: "Tiffany Mills", message: "I've been using this for weeks" },
{ user: "Carmen Berry", message: "My friend told me to try this" },
{ user: "Rosa Morrison", message: "This product is fantastic" },
{ user: "Cindy Hansen", message: "Where's the best place to buy?" },
{ user: "Grace Welch", message: "My sister recommended this to me" },
{ user: "Wendy Herrera", message: "I need this ASAP" },
{ user: "Victoria Wade", message: "This helped my neuropathy pain" },
{ user: "Edith Sims", message: "My friend uses this with success" },
{ user: "Kim Caldwell", message: "Does anyone know the price?" },
{ user: "Sherry Lowe", message: "This looks very effective" },
{ user: "Sylvia Neal", message: "My neighbor swears by this" },
{ user: "Josephine Nguyen", message: "I'm so glad I tried this" },
{ user: "Thelma Lucas", message: "My friend said this changed everything" },
{ user: "Sheila Bradford", message: "Where can I order this?" },
{ user: "Ethel Curry", message: "This product really works!" },
{ user: "Marjorie Santos", message: "My sister uses it daily" },
{ user: "Marcia Klein", message: "Does it have any side effects?" },
{ user: "Elaine Chandler", message: "My friend recommended this highly" },
{ user: "Gloria Bowen", message: "I need the link to buy this" },
{ user: "Carole Patrick", message: "This is amazing for neuropathy" },
{ user: "Bernice Elliott", message: "My neighbor uses this and loves it" },
{ user: "Veronica Fletcher", message: "I've tried it and it works!" },
{ user: "Jeanette Powers", message: "My friend had wonderful results" },
{ user: "Claire Hardy", message: "Where do I find this?" },
{ user: "Doris Monroe", message: "This product is excellent" },
{ user: "Felicia Crawford", message: "My sister told me about this" },
{ user: "Beverly Goodwin", message: "Does it work fast?" },
{ user: "Bertha Hudson", message: "My friend uses this every day" },
{ user: "Gayle Warner", message: "I'm ordering this now" },
{ user: "Leah Calderon", message: "This helped my feet so much" },
{ user: "Constance Watkins", message: "My neighbor recommended this" },
{ user: "Gail Jensen", message: "Is this available online?" },
{ user: "Marion Tucker", message: "My friend said this is the best" },
{ user: "Harriet Cummings", message: "I need this product" },
{ user: "Hazel Walsh", message: "This looks really good!" },
{ user: "Beatrice Sherman", message: "My sister uses it with great results" },
{ user: "Elsie Maxwell", message: "Where can I buy this?" },
{ user: "Arlene Nash", message: "This product is wonderful" },
{ user: "Maureen Garrett", message: "My friend told me to get this" },
{ user: "Colleen Freeman", message: "Does it help with nerve pain?" },
{ user: "Allison Reid", message: "I've been using this for a month" },
{ user: "Tamara Murray", message: "My neighbor swears by this" },
{ user: "Joy Hopkins", message: "This is the best thing ever" },
{ user: "Georgia Barber", message: "My friend uses it and feels amazing" },
{ user: "Constance Daniels", message: "I need the purchase link" },
{ user: "Lillie Guerrero", message: "This really works for neuropathy" },
{ user: "Claudia Medina", message: "My sister recommended this" },
{ user: "Jackie Fitzgerald", message: "Does it work for diabetics?" },
{ user: "Marcia Lyons", message: "I'm so happy with this product" },
{ user: "Marsha Parks", message: "My friend had great success" },
{ user: "Melanie Walters", message: "Where's the website?" },
{ user: "Priscilla Craig", message: "This helped my pain so much" },
{ user: "Joanne Wade", message: "My neighbor uses this daily" },
{ user: "Karla Quinn", message: "I've tried it and recommend it" },
{ user: "Rosemary Washington", message: "My friend loves this product" },
{ user: "Glenda Lamb", message: "Does anyone have the link?" },
{ user: "Lydia Hogan", message: "This is fantastic!" },
{ user: "Mildred Moss", message: "My sister told me about this" },
{ user: "Charlene Dennis", message: "I need this for my feet" },
{ user: "Roberta Potter", message: "My friend uses it with success" },
{ user: "Francine George", message: "Where do I order this?" },
{ user: "Deanna Bryant", message: "This product is the best" },
{ user: "Gina Hicks", message: "My neighbor recommended this highly" },
{ user: "Darlene Crawford", message: "I'm ordering mine today" },
{ user: "Wilma Estrada", message: "Does it really help?" },
{ user: "Gwendolyn Sandoval", message: "My friend swears by this" },
{ user: "Jennie Gibbs", message: "This is wonderful for neuropathy" },
{ user: "Nora Weaver", message: "My sister uses this every day" },
{ user: "Margie Gibson", message: "I can walk without pain now!" },
{ user: "Nina Holland", message: "My friend told me to try this" },
{ user: "Cassandra Watts", message: "Where can I get this?" },
{ user: "Leah Lambert", message: "This product really works" },
{ user: "Penny Christensen", message: "My neighbor loves this" },
{ user: "Kay Goodman", message: "I've been using it for weeks" },
{ user: "Priscilla Hale", message: "My friend had amazing results" },
{ user: "Naomi Reeves", message: "This is exactly what I needed" },
{ user: "Carole Roman", message: "Does it work on arms too?" },
{ user: "Brandy Webster", message: "My sister recommended this to me" },
];
