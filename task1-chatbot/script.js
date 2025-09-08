// Iron Lady FAQ Chatbot JavaScript
class IronLadyChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.conversationHistory = [];
        this.currentContext = null;
        this.userPreferences = {};
        this.responseVariations = 0;
        this.initializeFAQData();
        this.initializeAIPatterns();
        this.initializeEnhancedAI();
    }

    initializeFAQData() {
        this.faqData = {
            programs: {
                keywords: ['program', 'course', 'offering', 'what do you offer', 'services'],
                response: `Iron Lady offers comprehensive leadership programs designed for women professionals:

🌟 Core Programs:
• Executive Leadership Accelerator - 6 months intensive program
• Women Leadership Foundation Course - 3 months beginner-friendly
• Leadership Mastery Bootcamp - 2 weeks intensive workshop
• Corporate Leadership Training - Customizable for organizations
• Entrepreneurship & Innovation Program - 4 months startup-focused

Each program is designed to empower women leaders with practical skills, strategic thinking, and confidence to excel in their careers.`
            },
            duration: {
                keywords: ['duration', 'long', 'time', 'months', 'weeks', 'how long'],
                response: `Program durations vary based on the course you choose:

⏱️ Program Durations:
• Executive Leadership Accelerator: 6 months (comprehensive)
• Women Leadership Foundation: 3 months (structured learning)
• Leadership Mastery Bootcamp: 2 weeks (intensive)
• Corporate Training: Flexible (1 day to 3 months based on needs)
• Entrepreneurship Program: 4 months (with mentorship)

Most programs include ongoing mentorship and alumni network access for continued support beyond the formal program duration.`
            },
            format: {
                keywords: ['online', 'offline', 'virtual', 'person', 'location', 'where', 'how'],
                response: `Iron Lady offers flexible learning formats to accommodate different needs:

📍 Program Formats:
• Hybrid Model - Combination of online and offline sessions
• Online Sessions - Interactive virtual workshops and webinars
• Offline Workshops - In-person sessions at ITPL, Bengaluru
• One-on-One Mentoring - Personal coaching sessions (online/offline)
• Corporate On-site - We come to your organization

Primary Location: ITPL, Bengaluru for in-person sessions
Most programs offer flexibility to attend online sessions if you cannot attend in person.`
            },
            certificates: {
                keywords: ['certificate', 'certification', 'credential', 'recognition', 'diploma'],
                response: `Yes! Iron Lady provides official certifications for all completed programs:

🏆 Certifications Include:
• Official Certificate of Completion - For all programs
• Digital Badge - LinkedIn shareable credentials
• Leadership Assessment Report - Detailed skill evaluation
• Alumni Network Access - Lifetime membership
• Continuing Education Credits - Professional development hours

All certificates are:
✅ Industry-recognized and valuable for career advancement
✅ Include detailed curriculum and skills covered
✅ Available in both digital and physical formats
✅ Backed by Iron Lady's reputation in leadership development`
            },
            mentors: {
                keywords: ['mentor', 'coach', 'instructor', 'teacher', 'trainer', 'faculty', 'who teaches'],
                response: `Our mentors are accomplished women leaders with extensive industry experience:

👩‍💼 Our Mentoring Team:
• C-Suite Executives - Current and former CEOs, CTOs, CFOs
• Successful Entrepreneurs - Founders of successful startups and businesses
• Industry Experts - Leaders from tech, finance, healthcare, and consulting
• Academic Leaders - Professors and researchers in leadership studies
• International Speakers - Recognized thought leaders in women's leadership

Mentoring Approach:
• Personalized guidance based on your career goals
• Regular 1:1 sessions throughout the program
• Group mentoring circles for peer learning
• Ongoing support even after program completion
• Real-world project guidance and feedback

All mentors are carefully selected for their expertise, leadership experience, and passion for developing other women leaders.`
            },
            contact: {
                keywords: ['contact', 'reach', 'phone', 'email', 'address', 'location'],
                response: `Get in touch with Iron Lady team:

📞 Contact Information:
• Email: careers@iamironlady.com
• Website: iamironlady.com
• Office: ITPL, Bengaluru, Karnataka
• Social Media: Follow us on LinkedIn and Instagram

For Program Inquiries:
• Schedule a free consultation call
• Join our upcoming webinar sessions
• Download our program brochure
• Attend a campus visit

We're here to help you choose the right leadership program for your career goals! 🚀`
            }
        };
    }

    initializeAIPatterns() {
        this.greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
        this.gratitude = ['thank you', 'thanks', 'appreciate', 'grateful'];
        this.farewells = ['bye', 'goodbye', 'see you', 'farewell', 'take care'];
    }
    
    initializeEnhancedAI() {
        // Enhanced AI response variations
        this.responseVariants = {
            programs: [
                {
                    id: 'comprehensive',
                    response: `Iron Lady offers comprehensive leadership programs designed for women professionals:

🌟 Core Programs:
• Executive Leadership Accelerator - 6 months intensive program
• Women Leadership Foundation Course - 3 months beginner-friendly
• Leadership Mastery Bootcamp - 2 weeks intensive workshop
• Corporate Leadership Training - Customizable for organizations
• Entrepreneurship & Innovation Program - 4 months startup-focused

Each program is designed to empower women leaders with practical skills, strategic thinking, and confidence to excel in their careers.`
                },
                {
                    id: 'focused',
                    response: `Here are Iron Lady's signature leadership programs:

🎯 Popular Choices:
• Executive Leadership Accelerator - Our flagship 6-month program
• Women Leadership Foundation - Perfect for emerging leaders (3 months)
• Leadership Mastery Bootcamp - Intensive 2-week transformation
• Corporate Training Solutions - Tailored for your organization

All programs focus on building authentic leadership presence and strategic thinking capabilities.`
                },
                {
                    id: 'detailed',
                    response: `Iron Lady specializes in women's leadership development with these key programs:

💼 Executive Track:
• Executive Leadership Accelerator (6 months) - For senior professionals
• Corporate Leadership Training (Flexible) - Custom organizational solutions

🌱 Foundation Track:
• Women Leadership Foundation (3 months) - For emerging leaders
• Leadership Mastery Bootcamp (2 weeks) - Intensive skill building

🚀 Specialty Track:
• Entrepreneurship & Innovation Program (4 months) - For business builders

Each track is designed with practical applications and peer networking opportunities.`
                }
            ],
            duration: [
                {
                    id: 'standard',
                    response: `Program durations vary based on the course you choose:

⏱️ Program Durations:
• Executive Leadership Accelerator: 6 months (comprehensive)
• Women Leadership Foundation: 3 months (structured learning)
• Leadership Mastery Bootcamp: 2 weeks (intensive)
• Corporate Training: Flexible (1 day to 3 months based on needs)
• Entrepreneurship Program: 4 months (with mentorship)

Most programs include ongoing mentorship and alumni network access for continued support beyond the formal program duration.`
                },
                {
                    id: 'commitment',
                    response: `Here's what time commitment looks like for each program:

📅 Time Investment:
• Executive Leadership Accelerator: 6 months - 10 hours/week
• Women Leadership Foundation: 3 months - 8 hours/week
• Leadership Mastery Bootcamp: 2 weeks - Full-time intensive
• Corporate Training: 1 day to 3 months - Customized schedule
• Entrepreneurship Program: 4 months - 6 hours/week + project work

All programs are designed to fit around professional schedules with evening and weekend options available.`
                },
                {
                    id: 'flexible',
                    response: `Our programs offer flexible duration options:

🔄 Flexible Learning Paths:
• Executive Leadership Accelerator: 6 months (can extend to 8 months)
• Women Leadership Foundation: 3 months (fast-track 6 weeks available)
• Leadership Mastery Bootcamp: 2 weeks intensive (or 4 weekend sessions)
• Corporate Training: Fully customizable from 1-day workshops to 3-month programs
• Entrepreneurship Program: 4 months with optional 2-month incubation extension

We understand busy professional schedules and offer makeup sessions and flexible pacing.`
                }
            ],
            format: [
                {
                    id: 'hybrid',
                    response: `Iron Lady offers flexible learning formats to accommodate different needs:

📍 Program Formats:
• Hybrid Model - Combination of online and offline sessions
• Online Sessions - Interactive virtual workshops and webinars
• Offline Workshops - In-person sessions at ITPL, Bengaluru
• One-on-One Mentoring - Personal coaching sessions (online/offline)
• Corporate On-site - We come to your organization

Primary Location: ITPL, Bengaluru for in-person sessions
Most programs offer flexibility to attend online sessions if you cannot attend in person.`
                },
                {
                    id: 'online_focus',
                    response: `Our online learning experience is designed for maximum engagement:

💻 Online Program Features:
• Live Interactive Sessions - Real-time participation with instructors
• Virtual Breakout Rooms - Small group discussions and networking
• Digital Resources - Downloadable toolkits and templates
• Online Community Platform - Peer networking and ongoing support
• Recorded Sessions - Access to replay key content

🌍 Global Accessibility:
• Multiple timezone options for international participants
• Mobile-friendly platform for learning on-the-go
• Technical support available 24/7`
                },
                {
                    id: 'offline_focus',
                    response: `Our in-person experience offers unique benefits:

🏢 Offline Program Advantages:
• Face-to-Face Networking - Build lasting professional relationships
• Hands-on Workshops - Interactive exercises and role-playing
• Campus Experience - Modern facilities at ITPL, Bengaluru
• Group Projects - Collaborative learning with immediate feedback
• Executive Presence Training - In-person communication coaching

📍 Location Benefits:
• ITPL Bengaluru - Tech hub networking opportunities
• Modern conference facilities with latest technology
• Accommodation recommendations for outstation participants
• Airport pickup services available for premium programs`
                }
            ]
        };
        
        // Context-aware response system
        this.contextualResponses = {
            'follow_up_programs': [
                "Would you like to know more about any specific program?",
                "Which program sounds most interesting to you?",
                "Do you have experience level preferences - beginner or advanced?"
            ],
            'follow_up_format': [
                "Are you looking for online or in-person learning?",
                "Would you prefer flexible scheduling or intensive format?",
                "Do you have any location preferences?"
            ],
            'follow_up_duration': [
                "What time commitment works best for your schedule?",
                "Are you looking for a quick intensive or longer-term development?",
                "Would you like to know about part-time vs full-time options?"
            ]
        };
        
        // Conversation memory system
        this.conversationMemory = {
            topics_discussed: [],
            user_interests: [],
            session_start: new Date()
        };
    }

    sendMessage() {
        const message = this.userInput.value.trim();
        if (message === '') return;

        this.addMessage(message, 'user');
        this.userInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI processing time
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    askQuestion(question) {
        this.addMessage(question, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(question);
            this.addMessage(response, 'bot');
        }, 800);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Add to conversation history
        this.conversationHistory.push({
            user: message,
            timestamp: new Date()
        });
        
        // Enhanced greeting system with context awareness
        if (this.greetings.some(greeting => lowerMessage.includes(greeting))) {
            const greetings = [
                `Hello! 👋 Welcome to Iron Lady's AI-powered FAQ assistant. I'm here to help you discover our transformative leadership programs. What would you like to explore?`,
                `Hi there! 🌟 I'm your Iron Lady program advisor. I can provide personalized information about our leadership development opportunities. How can I assist you today?`,
                `Welcome! 💼 I'm an AI assistant specialized in Iron Lady's leadership programs. I'm here to help you find the perfect program for your career goals. What interests you?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Enhanced gratitude responses
        if (this.gratitude.some(thanks => lowerMessage.includes(thanks))) {
            const responses = [
                `You're very welcome! 😊 I'm delighted to help. Is there anything else about Iron Lady's programs you'd like to explore?`,
                `My pleasure! 🌟 I'm here whenever you need guidance on your leadership journey. Any other questions?`,
                `Glad I could assist! 💡 Feel free to ask about any other aspects of our programs - I'm here to help you make the best choice.`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Enhanced farewell responses
        if (this.farewells.some(bye => lowerMessage.includes(bye))) {
            const farewells = [
                `Goodbye! 👋 Thank you for exploring Iron Lady's programs with me. We look forward to supporting your leadership journey. Visit iamironlady.com for more details!`,
                `Take care! 🌟 It was great helping you learn about our programs. Remember, great leaders are made, not born. Hope to see you in one of our programs soon!`,
                `See you later! 💼 Thanks for your interest in Iron Lady's leadership development. Your future leadership impact awaits!`
            ];
            return farewells[Math.floor(Math.random() * farewells.length)];
        }

        // Enhanced FAQ system with dynamic responses
        const response = this.getEnhancedFAQResponse(lowerMessage);
        if (response) {
            return response;
        }

        // Enhanced help responses
        if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
            return `I'm your AI-powered Iron Lady assistant! 🤖 I specialize in:
            
• Programs & Courses - Detailed information about our leadership offerings
• Program Duration - Time commitments and flexible scheduling options
• Learning Formats - Online, offline, and hybrid learning experiences
• Certification - Credentials and professional development credits
• Expert Mentors - Information about our accomplished leadership coaches
• Contact & Enrollment - How to connect with our team

💡 Pro tip: Ask me specific questions like "What's the best program for new managers?" for personalized recommendations!`;
        }

        // Enhanced pricing responses with AI intelligence
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('investment')) {
            return `I understand investment is an important consideration! 💰 Our program pricing varies based on:

📊 Pricing Factors:
• Program duration and intensity
• Group vs individual coaching components
• Online vs in-person delivery format
• Corporate vs individual enrollment

💡 Best Approach:
Connect with our enrollment team for personalized pricing:
📧 Email: careers@iamironlady.com
🌐 Website: iamironlady.com

They can provide:
• Customized program recommendations
• Flexible payment options
• Scholarship and corporate discount information
• ROI analysis for your leadership development investment`;
        }

        // Enhanced application process
        if (lowerMessage.includes('apply') || lowerMessage.includes('register') || lowerMessage.includes('enroll') || lowerMessage.includes('join')) {
            return `Exciting! Let's get you started on your leadership transformation journey! 🚀

🎯 Quick Application Process:
Step 1: Visit iamironlady.com to explore program details
Step 2: Complete our leadership assessment questionnaire
Step 3: Schedule a complimentary consultation call
Step 4: Receive your personalized program recommendation
Step 5: Finalize enrollment with flexible payment options

⚡ Fast Track Option:
Email us at careers@iamironlady.com with:
• Your current role and leadership experience
• Your professional development goals
• Preferred program format and timeline

🎁 Bonus: Mention this AI chat for a complimentary leadership style assessment!

Our team responds within 4 hours on business days.`;
        }

        // Intelligent fallback with contextual suggestions
        return this.getIntelligentFallback(lowerMessage);
    }
    
    // Enhanced FAQ Response System
    getEnhancedFAQResponse(lowerMessage) {
        // Programs - with variations
        if (this.matchesKeywords(lowerMessage, ['program', 'course', 'offering', 'what do you offer', 'services'])) {
            this.conversationMemory.topics_discussed.push('programs');
            const variant = this.getResponseVariant('programs');
            const followUp = this.getRandomFollowUp('follow_up_programs');
            return variant.response + '\n\n' + followUp;
        }
        
        // Duration - with variations
        if (this.matchesKeywords(lowerMessage, ['duration', 'long', 'time', 'months', 'weeks', 'how long', 'commitment'])) {
            this.conversationMemory.topics_discussed.push('duration');
            const variant = this.getResponseVariant('duration');
            const followUp = this.getRandomFollowUp('follow_up_duration');
            return variant.response + '\n\n' + followUp;
        }
        
        // Format - with enhanced variations for online/offline
        if (this.matchesKeywords(lowerMessage, ['online', 'offline', 'virtual', 'person', 'location', 'where', 'format', 'hybrid'])) {
            this.conversationMemory.topics_discussed.push('format');
            
            // Intelligent format selection based on keywords
            let variant;
            if (lowerMessage.includes('online') || lowerMessage.includes('virtual') || lowerMessage.includes('remote')) {
                variant = this.responseVariants.format.find(v => v.id === 'online_focus');
            } else if (lowerMessage.includes('offline') || lowerMessage.includes('person') || lowerMessage.includes('campus')) {
                variant = this.responseVariants.format.find(v => v.id === 'offline_focus');
            } else {
                variant = this.getResponseVariant('format');
            }
            
            const followUp = this.getRandomFollowUp('follow_up_format');
            return variant.response + '\n\n' + followUp;
        }
        
        // Certificates - enhanced response
        if (this.matchesKeywords(lowerMessage, ['certificate', 'certification', 'credential', 'recognition', 'diploma'])) {
            this.conversationMemory.topics_discussed.push('certificates');
            return this.faqData.certificates.response + '\n\n' + 'Would you like to know about specific certification requirements or how these credentials can advance your career?';
        }
        
        // Mentors - enhanced response
        if (this.matchesKeywords(lowerMessage, ['mentor', 'coach', 'instructor', 'teacher', 'trainer', 'faculty', 'who teaches'])) {
            this.conversationMemory.topics_discussed.push('mentors');
            return this.faqData.mentors.response + '\n\n' + 'Would you like to learn about our mentor matching process or hear success stories from our alumni?';
        }
        
        // Contact - enhanced response
        if (this.matchesKeywords(lowerMessage, ['contact', 'reach', 'phone', 'email', 'address', 'location'])) {
            this.conversationMemory.topics_discussed.push('contact');
            return this.faqData.contact.response + '\n\n' + 'I can also help you determine which program might be the best fit before you contact our team. What are your leadership goals?';
        }
        
        return null; // No match found
    }
    
    // Helper methods
    matchesKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
    
    getResponseVariant(category) {
        const variants = this.responseVariants[category];
        if (!variants) return null;
        
        // Cycle through variants to avoid repetition
        const variantIndex = this.responseVariations % variants.length;
        this.responseVariations++;
        return variants[variantIndex];
    }
    
    getRandomFollowUp(category) {
        const followUps = this.contextualResponses[category];
        if (!followUps) return '';
        return followUps[Math.floor(Math.random() * followUps.length)];
    }
    
    // Intelligent Fallback System
    getIntelligentFallback(lowerMessage) {
        // Analyze user intent and provide contextual suggestions
        let suggestions = [];
        let personalizedMessage = '';
        
        // Check for career-level indicators
        if (lowerMessage.includes('new') || lowerMessage.includes('beginner') || lowerMessage.includes('starting')) {
            personalizedMessage = 'It sounds like you might be early in your leadership journey! \ud83c\udf31';
            suggestions = [
                'Our Women Leadership Foundation Course is perfect for emerging leaders',
                'Consider starting with our Leadership Mastery Bootcamp for quick skills',
                'Learn about mentorship opportunities for new leaders'
            ];
        } else if (lowerMessage.includes('executive') || lowerMessage.includes('senior') || lowerMessage.includes('experienced')) {
            personalizedMessage = 'I see you\'re looking for executive-level development! \ud83d\udcbc';
            suggestions = [
                'The Executive Leadership Accelerator might be perfect for you',
                'Explore our Corporate Leadership Training options',
                'Learn about our C-suite mentorship program'
            ];
        } else if (lowerMessage.includes('entrepreneur') || lowerMessage.includes('startup') || lowerMessage.includes('business')) {
            personalizedMessage = 'Entrepreneurial leadership is exciting! \ud83d\ude80';
            suggestions = [
                'Check out our Entrepreneurship & Innovation Program',
                'Learn about startup-focused mentorship',
                'Discover how to build leadership skills while scaling your business'
            ];
        } else {
            personalizedMessage = 'I\'m here to help you find the perfect leadership development path! \ud83e\udd14';
            suggestions = [
                'Tell me about your current role or leadership goals',
                'Ask about specific programs or learning formats',
                'Explore our mentorship and certification options'
            ];
        }
        
        const fallbackResponse = `${personalizedMessage}\n\n\ud83d\udca1 Here are some suggestions:\n${suggestions.map(s => '\u2022 ' + s).join('\n')}\n\n\ud83d\udcac You can also try:\n\u2022 Using the quick question buttons below\n\u2022 Asking about specific career situations\n\u2022 Requesting program recommendations\n\nOr contact our team directly at careers@iamironlady.com for personalized guidance!`;
        
        return fallbackResponse;
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span class="typing-dots">Iron Lady Bot is typing</span>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator-message');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }
}

// Initialize chatbot when page loads
let chatbot;
document.addEventListener('DOMContentLoaded', function() {
    chatbot = new IronLadyChatbot();
    initializeMobileOptimizations();
});

// Mobile optimizations
function initializeMobileOptimizations() {
    // Prevent iOS zoom on input focus
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                document.body.style.zoom = 1;
            }
        });
    });

    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button, .quick-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        }, { passive: true });
    });

    // Handle viewport changes (keyboard open/close on mobile)
    let initialViewportHeight = window.innerHeight;
    window.addEventListener('resize', function() {
        const currentHeight = window.innerHeight;
        const chatContainer = document.querySelector('.chat-container');
        
        if (window.innerWidth <= 768) {
            if (currentHeight < initialViewportHeight * 0.8) {
                // Keyboard is likely open
                chatContainer.style.height = '300px';
                document.body.classList.add('keyboard-open');
            } else {
                // Keyboard is likely closed
                chatContainer.style.height = '';
                document.body.classList.remove('keyboard-open');
            }
        }
    });

    // Auto-scroll to input when focused on mobile
    const userInput = document.getElementById('userInput');
    userInput.addEventListener('focus', function() {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
}

// Global functions for HTML event handlers
function sendMessage() {
    chatbot.sendMessage();
}

function askQuestion(question) {
    chatbot.askQuestion(question);
}

function handleKeyPress(event) {
    chatbot.handleKeyPress(event);
}
