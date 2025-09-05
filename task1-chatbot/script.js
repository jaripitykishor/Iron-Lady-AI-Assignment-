// Iron Lady FAQ Chatbot JavaScript
class IronLadyChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.initializeFAQData();
        this.initializeAIPatterns();
    }

    initializeFAQData() {
        this.faqData = {
            programs: {
                keywords: ['program', 'course', 'offering', 'what do you offer', 'services'],
                response: `Iron Lady offers comprehensive leadership programs designed for women professionals:

🌟 **Core Programs:**
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

⏱️ **Program Durations:**
• Executive Leadership Accelerator: **6 months** (comprehensive)
• Women Leadership Foundation: **3 months** (structured learning)
• Leadership Mastery Bootcamp: **2 weeks** (intensive)
• Corporate Training: **Flexible** (1 day to 3 months based on needs)
• Entrepreneurship Program: **4 months** (with mentorship)

Most programs include ongoing mentorship and alumni network access for continued support beyond the formal program duration.`
            },
            format: {
                keywords: ['online', 'offline', 'virtual', 'person', 'location', 'where', 'how'],
                response: `Iron Lady offers flexible learning formats to accommodate different needs:

📍 **Program Formats:**
• **Hybrid Model** - Combination of online and offline sessions
• **Online Sessions** - Interactive virtual workshops and webinars
• **Offline Workshops** - In-person sessions at ITPL, Bengaluru
• **One-on-One Mentoring** - Personal coaching sessions (online/offline)
• **Corporate On-site** - We come to your organization

**Primary Location:** ITPL, Bengaluru for in-person sessions
Most programs offer flexibility to attend online sessions if you cannot attend in person.`
            },
            certificates: {
                keywords: ['certificate', 'certification', 'credential', 'recognition', 'diploma'],
                response: `Yes! Iron Lady provides official certifications for all completed programs:

🏆 **Certifications Include:**
• **Official Certificate of Completion** - For all programs
• **Digital Badge** - LinkedIn shareable credentials
• **Leadership Assessment Report** - Detailed skill evaluation
• **Alumni Network Access** - Lifetime membership
• **Continuing Education Credits** - Professional development hours

All certificates are:
✅ Industry-recognized and valuable for career advancement
✅ Include detailed curriculum and skills covered
✅ Available in both digital and physical formats
✅ Backed by Iron Lady's reputation in leadership development`
            },
            mentors: {
                keywords: ['mentor', 'coach', 'instructor', 'teacher', 'trainer', 'faculty', 'who teaches'],
                response: `Our mentors are accomplished women leaders with extensive industry experience:

👩‍💼 **Our Mentoring Team:**
• **C-Suite Executives** - Current and former CEOs, CTOs, CFOs
• **Successful Entrepreneurs** - Founders of successful startups and businesses
• **Industry Experts** - Leaders from tech, finance, healthcare, and consulting
• **Academic Leaders** - Professors and researchers in leadership studies
• **International Speakers** - Recognized thought leaders in women's leadership

**Mentoring Approach:**
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

📞 **Contact Information:**
• **Email:** careers@iamironlady.com
• **Website:** iamironlady.com
• **Office:** ITPL, Bengaluru, Karnataka
• **Social Media:** Follow us on LinkedIn and Instagram

**For Program Inquiries:**
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
        
        // Check for greetings
        if (this.greetings.some(greeting => lowerMessage.includes(greeting))) {
            return `Hello! 👋 Welcome to Iron Lady's FAQ Chatbot. I'm here to help you learn about our leadership programs. What would you like to know?`;
        }
        
        // Check for gratitude
        if (this.gratitude.some(thanks => lowerMessage.includes(thanks))) {
            return `You're very welcome! 😊 I'm glad I could help. If you have any other questions about Iron Lady's programs, feel free to ask!`;
        }
        
        // Check for farewells
        if (this.farewells.some(bye => lowerMessage.includes(bye))) {
            return `Goodbye! 👋 Thank you for your interest in Iron Lady's leadership programs. We hope to see you in one of our programs soon! Visit iamironlady.com for more information.`;
        }

        // Check FAQ categories
        for (const [category, data] of Object.entries(this.faqData)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }

        // Enhanced AI-like fallback responses
        if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
            return `I'm here to help! 🤖 I can answer questions about:
            
• **Programs offered** - Our leadership courses and training
• **Duration** - How long each program takes
• **Format** - Online, offline, or hybrid options  
• **Certificates** - What credentials you'll receive
• **Mentors** - Who will guide your learning journey
• **Contact** - How to reach our team

What specific information would you like to know?`;
        }

        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
            return `For detailed pricing information, I recommend contacting our team directly:

📧 **Email:** careers@iamironlady.com
🌐 **Website:** iamironlady.com

Pricing varies based on the program and any current promotions. Our team can provide you with:
• Detailed pricing for each program
• Available payment plans
• Scholarship opportunities
• Corporate group discounts`;
        }

        if (lowerMessage.includes('apply') || lowerMessage.includes('register') || lowerMessage.includes('enroll')) {
            return `Ready to join Iron Lady? 🚀 Here's how to apply:

**Step 1:** Visit our website at iamironlady.com
**Step 2:** Browse our programs and choose the right fit
**Step 3:** Fill out the application form
**Step 4:** Schedule a consultation call
**Step 5:** Complete the enrollment process

✨ **Quick Application:** Email us at careers@iamironlady.com with:
• Your background and experience
• Which program interests you
• Your career goals

We'll get back to you within 24 hours!`;
        }

        // Default fallback with suggestions
        return `I'd love to help, but I didn't quite understand your question. 🤔 

Here are some things I can help you with:
• What programs does Iron Lady offer?
• What is the program duration?
• Is the program online or offline?
• Are certificates provided?
• Who are the mentors/coaches?

You can also try using the quick question buttons below, or rephrase your question. For specific inquiries, feel free to contact us at careers@iamironlady.com`;
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
});

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
