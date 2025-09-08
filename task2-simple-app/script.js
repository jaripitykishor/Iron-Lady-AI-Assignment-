// Iron Lady Course Management System
class CourseManagementSystem {
    constructor() {
        this.courses = this.loadCourses();
        this.currentEditId = null;
        this.filteredCourses = [...this.courses];
        
        this.initializeEventListeners();
        this.initializeStarRating();
        this.initializeApp();
        
        // Enhanced AI-powered suggestions data
        this.aiSuggestions = [
            "Advanced Leadership Communication for Women",
            "Digital Transformation Leadership",
            "Emotional Intelligence in Leadership",
            "Strategic Decision Making for Executives",
            "Building High-Performance Teams",
            "Women in Tech Leadership",
            "Inclusive Leadership Practices",
            "Crisis Management and Leadership",
            "Innovation and Creative Leadership",
            "Global Leadership in Remote Teams",
            "Sustainable Leadership Practices",
            "Cross-Cultural Leadership Excellence",
            "Agile Leadership Methodologies",
            "Executive Presence and Impact",
            "Change Leadership Mastery"
        ];
        
        // Enhanced AI templates for more realistic generation
        this.aiTemplates = {
            courseNames: {
                Leadership: [
                    "Executive Leadership Accelerator",
                    "Strategic Leadership Mastery",
                    "Women Leadership Excellence Program",
                    "Advanced Leadership Transformation",
                    "Global Leadership Impact Initiative",
                    "Authentic Leadership Development",
                    "Visionary Leadership Academy",
                    "Leadership Innovation Lab",
                    "Executive Presence Mastery",
                    "Transformational Leadership Journey"
                ],
                Management: [
                    "Modern Management Excellence",
                    "Strategic Team Management",
                    "Performance Management Mastery",
                    "Agile Management Practices",
                    "Digital Age Management Skills",
                    "Innovation Management Program",
                    "Cross-Functional Management",
                    "People Management Excellence",
                    "Strategic Operations Management",
                    "Change Management Leadership"
                ],
                Communication: [
                    "Executive Communication Mastery",
                    "Strategic Communication Excellence",
                    "Leadership Communication Impact",
                    "Digital Communication Strategies",
                    "Cross-Cultural Communication",
                    "Influential Communication Skills",
                    "Executive Storytelling Mastery",
                    "Crisis Communication Leadership",
                    "Persuasive Communication Techniques",
                    "Authentic Communication Excellence"
                ],
                Technical: [
                    "Digital Leadership for Tech Professionals",
                    "Technology Management Excellence",
                    "AI and Leadership Integration",
                    "Digital Transformation Leadership",
                    "Tech Leadership Fundamentals",
                    "Innovation in Technology Leadership",
                    "Cybersecurity Leadership Program",
                    "Data-Driven Leadership Excellence",
                    "Cloud Leadership Strategies",
                    "Emerging Tech Leadership"
                ],
                'Personal Development': [
                    "Personal Leadership Excellence",
                    "Career Acceleration Program",
                    "Professional Growth Mastery",
                    "Leadership Mindset Development",
                    "Executive Career Transformation",
                    "Personal Brand Leadership",
                    "Resilience and Leadership",
                    "Confidence Building for Leaders",
                    "Work-Life Integration Mastery",
                    "Purpose-Driven Leadership"
                ]
            }
        };
    }

    // Initialize the application
    initializeApp() {
        this.updateDashboardStats();
        this.renderCourses();
        this.renderRecentCourses();
        this.generateAISuggestions();
        this.showSection('dashboard');
    }

    // Event Listeners
    initializeEventListeners() {
        // Form submission
        document.getElementById('courseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCourse();
        });

        // Modal click outside to close
        document.getElementById('courseModal').addEventListener('click', (e) => {
            if (e.target.id === 'courseModal') {
                this.closeModal();
            }
        });
    }

    // Star Rating System
    initializeStarRating() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                document.getElementById('courseRating').value = rating;
                this.updateStarDisplay(rating);
            });

            star.addEventListener('mouseenter', () => {
                this.updateStarDisplay(index + 1, true);
            });
        });

        document.getElementById('starRating').addEventListener('mouseleave', () => {
            const currentRating = parseInt(document.getElementById('courseRating').value);
            this.updateStarDisplay(currentRating);
        });

        // Initialize with 5 stars
        this.updateStarDisplay(5);
    }

    updateStarDisplay(rating, isHover = false) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Local Storage Operations
    saveCourses() {
        localStorage.setItem('ironLadyCourses', JSON.stringify(this.courses));
    }

    loadCourses() {
        const saved = localStorage.getItem('ironLadyCourses');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Return sample courses if none exist
        return this.getSampleCourses();
    }

    getSampleCourses() {
        return [
            {
                id: 1,
                name: "Executive Leadership Accelerator",
                category: "Leadership",
                duration: 120,
                rating: 4.8,
                price: 2999.99,
                maxStudents: 20,
                description: "Comprehensive 6-month program designed to accelerate women into executive leadership roles. Covers strategic thinking, team management, and organizational transformation.",
                learningOutcomes: "Strategic leadership skills, Executive presence, Change management, Board readiness",
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                name: "Women Leadership Foundation",
                category: "Personal Development",
                duration: 60,
                rating: 4.6,
                price: 1499.99,
                maxStudents: 30,
                description: "3-month foundational program for emerging women leaders. Focus on confidence building, communication skills, and leadership fundamentals.",
                learningOutcomes: "Leadership fundamentals, Confidence building, Effective communication, Network building",
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                name: "Digital Leadership Mastery",
                category: "Technical",
                duration: 40,
                rating: 4.7,
                price: 899.99,
                maxStudents: 25,
                description: "Master digital transformation and technology leadership in the modern workplace. Learn to lead digital teams and drive innovation.",
                learningOutcomes: "Digital transformation, Technology leadership, Innovation management, Digital team leadership",
                dateAdded: new Date().toISOString()
            }
        ];
    }

    // CRUD Operations
    createCourse(courseData) {
        const newCourse = {
            ...courseData,
            id: Date.now(),
            dateAdded: new Date().toISOString()
        };
        
        this.courses.unshift(newCourse);
        this.saveCourses();
        this.updateDashboardStats();
        this.renderCourses();
        this.renderRecentCourses();
        
        this.showToast('Course created successfully!', 'success');
        return newCourse;
    }

    updateCourse(id, courseData) {
        const index = this.courses.findIndex(course => course.id === id);
        if (index !== -1) {
            this.courses[index] = { ...this.courses[index], ...courseData };
            this.saveCourses();
            this.updateDashboardStats();
            this.renderCourses();
            this.renderRecentCourses();
            
            this.showToast('Course updated successfully!', 'success');
            return this.courses[index];
        }
        return null;
    }

    deleteCourse(id) {
        const index = this.courses.findIndex(course => course.id === id);
        if (index !== -1) {
            const course = this.courses[index];
            this.courses.splice(index, 1);
            this.saveCourses();
            this.updateDashboardStats();
            this.renderCourses();
            this.renderRecentCourses();
            
            this.showToast(`Course "${course.name}" deleted successfully!`, 'success');
            this.closeModal();
            return true;
        }
        return false;
    }

    getCourse(id) {
        return this.courses.find(course => course.id === id);
    }

    // Form Operations
    saveCourse() {
        const formData = new FormData(document.getElementById('courseForm'));
        const courseData = {
            name: formData.get('courseName'),
            category: formData.get('courseCategory'),
            duration: parseInt(formData.get('courseDuration')),
            rating: parseFloat(formData.get('courseRating')),
            price: parseFloat(formData.get('coursePrice')) || 0,
            maxStudents: parseInt(formData.get('courseStudents')) || 25,
            description: formData.get('courseDescription'),
            learningOutcomes: formData.get('courseLearningOutcomes') || ''
        };

        // Validation
        if (!courseData.name || !courseData.category || !courseData.duration || !courseData.description) {
            this.showToast('Please fill in all required fields!', 'error');
            return;
        }

        if (this.currentEditId) {
            // Update existing course
            this.updateCourse(this.currentEditId, courseData);
            this.currentEditId = null;
            document.getElementById('submitText').textContent = 'Save Course';
        } else {
            // Create new course
            this.createCourse(courseData);
        }

        this.resetForm();
        this.showSection('courses');
    }

    resetForm() {
        document.getElementById('courseForm').reset();
        document.getElementById('courseRating').value = '5';
        this.updateStarDisplay(5);
        this.currentEditId = null;
        document.getElementById('submitText').textContent = 'Save Course';
    }

    editCourse(id) {
        const course = this.getCourse(id);
        if (course) {
            // Populate form with course data
            document.getElementById('courseName').value = course.name;
            document.getElementById('courseCategory').value = course.category;
            document.getElementById('courseDuration').value = course.duration;
            document.getElementById('courseRating').value = course.rating;
            document.getElementById('coursePrice').value = course.price || '';
            document.getElementById('courseStudents').value = course.maxStudents;
            document.getElementById('courseDescription').value = course.description;
            document.getElementById('courseLearningOutcomes').value = course.learningOutcomes || '';
            
            this.updateStarDisplay(course.rating);
            this.currentEditId = id;
            document.getElementById('submitText').textContent = 'Update Course';
            
            this.showSection('add-course');
            this.closeModal();
        }
    }

    // Rendering Functions
    renderCourses() {
        const coursesList = document.getElementById('coursesList');
        
        if (this.filteredCourses.length === 0) {
            coursesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <h3>No courses found</h3>
                    <p>Try adjusting your search or filters, or create a new course.</p>
                </div>
            `;
            return;
        }

        coursesList.innerHTML = this.filteredCourses.map(course => `
            <div class="course-card" onclick="courseSystem.showCourseDetails(${course.id})">
                <div class="course-header">
                    <h3>${course.name}</h3>
                    <span class="course-category">${course.category}</span>
                </div>
                <div class="course-content">
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}h</span>
                        <span class="course-rating">
                            ${'⭐'.repeat(Math.floor(course.rating))} ${course.rating}
                        </span>
                        <span><i class="fas fa-users"></i> ${course.maxStudents}</span>
                    </div>
                    <div class="course-description">
                        ${course.description.substring(0, 120)}...
                    </div>
                    <div class="course-actions">
                        <button class="btn btn-small btn-primary" onclick="event.stopPropagation(); courseSystem.editCourse(${course.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-small btn-danger" onclick="event.stopPropagation(); courseSystem.deleteCourse(${course.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderRecentCourses() {
        const recentList = document.getElementById('recentCoursesList');
        const recentCourses = this.courses.slice(0, 3);
        
        if (recentCourses.length === 0) {
            recentList.innerHTML = '<p>No courses available yet.</p>';
            return;
        }

        recentList.innerHTML = recentCourses.map(course => `
            <div class="course-preview-item" onclick="courseSystem.showCourseDetails(${course.id})">
                <h4>${course.name}</h4>
                <p>${course.category} • ${course.duration}h • ⭐ ${course.rating}</p>
            </div>
        `).join('');
    }

    // Dashboard Statistics
    updateDashboardStats() {
        const totalCourses = this.courses.length;
        const totalDuration = this.courses.reduce((sum, course) => sum + course.duration, 0);
        const avgRating = totalCourses > 0 ? (this.courses.reduce((sum, course) => sum + course.rating, 0) / totalCourses).toFixed(1) : 0;
        const totalStudents = this.courses.reduce((sum, course) => sum + course.maxStudents, 0);

        document.getElementById('totalCourses').textContent = totalCourses;
        document.getElementById('totalDuration').textContent = totalDuration;
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('totalStudents').textContent = totalStudents;
    }

    // Course Details Modal
    showCourseDetails(id) {
        const course = this.getCourse(id);
        if (course) {
            const modal = document.getElementById('courseModal');
            const details = document.getElementById('courseDetails');
            
            details.innerHTML = `
                <div class="course-detail-header">
                    <h2 class="course-detail-title">${course.name}</h2>
                    <div class="course-detail-meta">
                        <span class="meta-item"><i class="fas fa-tag"></i> ${course.category}</span>
                        <span class="meta-item"><i class="fas fa-clock"></i> ${course.duration} hours</span>
                        <span class="meta-item"><i class="fas fa-star"></i> ${course.rating}/5</span>
                        <span class="meta-item"><i class="fas fa-users"></i> Max ${course.maxStudents} students</span>
                        ${course.price ? `<span class="meta-item"><i class="fas fa-dollar-sign"></i> $${course.price}</span>` : ''}
                    </div>
                </div>
                
                <div class="course-detail-content">
                    <h3>Description</h3>
                    <p>${course.description}</p>
                    
                    ${course.learningOutcomes ? `
                        <h3>Learning Outcomes</h3>
                        <p>${course.learningOutcomes}</p>
                    ` : ''}
                    
                    <div class="course-detail-actions">
                        <button class="btn btn-primary" onclick="courseSystem.editCourse(${course.id})">
                            <i class="fas fa-edit"></i> Edit Course
                        </button>
                        <button class="btn btn-danger" onclick="courseSystem.deleteCourse(${course.id})">
                            <i class="fas fa-trash"></i> Delete Course
                        </button>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
        }
    }

    closeModal() {
        document.getElementById('courseModal').style.display = 'none';
    }

    // Search and Filter Functions
    filterCourses() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('filterCategory').value;
        
        this.filteredCourses = this.courses.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchTerm) ||
                                course.description.toLowerCase().includes(searchTerm) ||
                                course.category.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || course.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        this.renderCourses();
    }

    sortCourses() {
        const sortBy = document.getElementById('sortBy').value;
        
        this.filteredCourses.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date':
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                case 'duration':
                    return b.duration - a.duration;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        
        this.renderCourses();
    }

    // Navigation
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.add('active');
        
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[onclick*="${sectionId}"]`).classList.add('active');
        
        // Reset filters when showing courses
        if (sectionId === 'courses') {
            this.filteredCourses = [...this.courses];
            document.getElementById('searchInput').value = '';
            document.getElementById('filterCategory').value = '';
            document.getElementById('sortBy').value = 'name';
            this.renderCourses();
        }
    }

    // Toast Notifications
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Enhanced AI-Powered Features
    generateAISuggestions() {
        const suggestionsList = document.getElementById('aiSuggestions');
        
        // Show loading state
        suggestionsList.innerHTML = `
            <div class="ai-suggestion-item loading">
                <i class="fas fa-robot"></i> AI is analyzing current trends...
            </div>
        `;
        
        setTimeout(() => {
            const randomSuggestions = this.getRandomSuggestions(4);
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            
            suggestionsList.innerHTML = `
                <div class="ai-suggestion-header">
                    <i class="fas fa-magic"></i> AI-Powered Suggestions for ${currentMonth}
                </div>
                ${randomSuggestions.map(suggestion => `
                    <div class="ai-suggestion-item">
                        <i class="fas fa-lightbulb"></i> ${suggestion}
                        <small class="suggestion-meta">Trending in professional development</small>
                    </div>
                `).join('')}
                <div class="ai-suggestion-footer">
                    <small><i class="fas fa-info-circle"></i> Suggestions powered by AI analysis of industry trends</small>
                </div>
            `;
        }, 800);
    }

    getRandomSuggestions(count) {
        const shuffled = [...this.aiSuggestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    generateCourseName() {
        const courseNameInput = document.getElementById('courseName');
        const category = document.getElementById('courseCategory').value;
        
        if (!category) {
            this.showToast('Please select a category first!', 'error');
            return;
        }
        
        // Simulate AI processing delay
        courseNameInput.value = 'AI is generating...';
        courseNameInput.style.background = 'linear-gradient(45deg, #e8f5e8, #f0f8ff)';
        
        setTimeout(() => {
            const suggestions = this.aiTemplates.courseNames[category] || this.aiTemplates.courseNames['Personal Development'];
            const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
            
            courseNameInput.value = randomSuggestion;
            
            // Enhanced visual feedback
            courseNameInput.style.background = 'linear-gradient(45deg, #e3f2fd, #f3e5f5)';
            courseNameInput.style.border = '2px solid #4CAF50';
            
            setTimeout(() => {
                courseNameInput.style.background = '';
                courseNameInput.style.border = '';
            }, 3000);
            
            this.showToast('✨ AI-powered course name generated successfully!', 'success');
        }, 800); // Simulate AI processing time
    }

    generateCourseDescription() {
        const descriptionTextarea = document.getElementById('courseDescription');
        const courseName = document.getElementById('courseName').value;
        const category = document.getElementById('courseCategory').value;
        const duration = document.getElementById('courseDuration').value || '40';
        
        if (!courseName || !category) {
            this.showToast('Please enter a course name and select a category first!', 'error');
            return;
        }
        
        // Simulate AI processing delay
        descriptionTextarea.value = 'AI is analyzing course requirements and generating comprehensive description...';
        descriptionTextarea.style.background = 'linear-gradient(45deg, #fff3e0, #f3e5f5)';
        
        setTimeout(() => {
            const templates = {
                'Leadership': {
                    intro: `Transform your leadership potential with "${courseName}", a comprehensive ${duration}-hour program designed specifically for emerging women leaders.`,
                    content: `This intensive course combines cutting-edge leadership theory with practical application, covering strategic thinking, team dynamics, and executive presence. Participants will master the art of inspirational leadership, develop authentic communication styles, and learn to navigate complex organizational challenges with confidence.`,
                    outcomes: `Key Learning Outcomes: Executive presence development, Strategic decision-making, Team leadership excellence, Change management skills, Authentic leadership style, Conflict resolution mastery, and Personal leadership philosophy.`,
                    closing: `Upon completion, graduates will possess the skills, confidence, and strategic mindset necessary to excel in senior leadership positions and drive meaningful organizational change.`
                },
                'Management': {
                    intro: `Master modern management excellence with "${courseName}", an intensive ${duration}-hour program for aspiring and current managers.`,
                    content: `This course integrates contemporary management theories with practical tools for team optimization, performance management, and organizational effectiveness. Participants will learn evidence-based approaches to people management, strategic planning, and operational excellence while developing their unique management philosophy.`,
                    outcomes: `Key Learning Outcomes: Performance management systems, Team motivation strategies, Strategic planning execution, Operational efficiency, People development skills, Data-driven decision making, and Management communication excellence.`,
                    closing: `Graduates will emerge with the competencies needed to build high-performing teams, drive results, and create positive workplace cultures that foster innovation and growth.`
                },
                'Communication': {
                    intro: `Elevate your influence with "${courseName}", a dynamic ${duration}-hour program focused on executive communication mastery.`,
                    content: `This comprehensive course develops advanced communication skills essential for leadership success. Participants will master public speaking, executive presentations, difficult conversations, and strategic communication planning. The program emphasizes authentic communication, digital messaging strategies, and cross-cultural competency.`,
                    outcomes: `Key Learning Outcomes: Executive presentation skills, Persuasive communication techniques, Crisis communication management, Digital communication strategies, Cross-cultural communication, Storytelling for leadership, and Authentic voice development.`,
                    closing: `Participants will graduate with the communication skills needed to inspire teams, influence stakeholders, and represent their organizations with confidence and authenticity.`
                },
                'Technical': {
                    intro: `Bridge technical expertise with leadership excellence in "${courseName}", a specialized ${duration}-hour program for technology professionals.`,
                    content: `This unique course combines technical acumen with leadership development, preparing participants to lead in technology-driven environments. The curriculum covers digital transformation, innovation management, technical team leadership, and strategic technology planning while maintaining focus on people leadership and organizational dynamics.`,
                    outcomes: `Key Learning Outcomes: Technical team leadership, Digital transformation strategies, Innovation management, Technology strategy development, Cross-functional collaboration, Technical communication to non-technical audiences, and Emerging technology leadership.`,
                    closing: `Graduates will be equipped to lead technical teams, drive digital innovation, and communicate complex technical concepts to diverse stakeholders while fostering collaborative, high-performance environments.`
                },
                'Personal Development': {
                    intro: `Unlock your leadership potential with "${courseName}", a transformative ${duration}-hour journey of personal and professional growth.`,
                    content: `This comprehensive program focuses on self-awareness, emotional intelligence, and personal leadership philosophy development. Participants will explore their values, strengths, and leadership style while building resilience, confidence, and career strategy. The course integrates mindfulness practices, goal-setting frameworks, and work-life integration strategies.`,
                    outcomes: `Key Learning Outcomes: Self-awareness development, Emotional intelligence mastery, Personal leadership philosophy, Goal setting and achievement, Career strategy development, Work-life integration, Resilience building, and Confidence enhancement.`,
                    closing: `Participants will emerge with a clear sense of purpose, enhanced self-confidence, and practical tools for continuous personal and professional growth throughout their leadership journey.`
                }
            };
            
            const template = templates[category] || templates['Personal Development'];
            const fullDescription = `${template.intro}\n\n${template.content}\n\n${template.outcomes}\n\n${template.closing}`;
            
            descriptionTextarea.value = fullDescription;
            
            // Enhanced visual feedback
            descriptionTextarea.style.background = 'linear-gradient(45deg, #e8f5e8, #f0f8ff)';
            descriptionTextarea.style.border = '2px solid #2196F3';
            
            setTimeout(() => {
                descriptionTextarea.style.background = '';
                descriptionTextarea.style.border = '';
            }, 4000);
            
            this.showToast('🚀 AI-powered course description generated successfully!', 'success');
        }, 1500); // Longer delay to simulate more complex AI processing
    }
    
    // NEW: Generate AI-powered learning outcomes
    generateLearningOutcomes() {
        const outcomesTextarea = document.getElementById('courseLearningOutcomes');
        const courseName = document.getElementById('courseName').value;
        const category = document.getElementById('courseCategory').value;
        const duration = document.getElementById('courseDuration').value || '40';
        
        if (!courseName || !category) {
            this.showToast('Please enter a course name and select a category first!', 'error');
            return;
        }
        
        // Simulate AI processing
        outcomesTextarea.value = 'AI is crafting personalized learning outcomes...';
        outcomesTextarea.style.background = 'linear-gradient(45deg, #f3e5f5, #e8f5e8)';
        
        setTimeout(() => {
            const outcomeTemplates = {
                'Leadership': [
                    'Develop authentic leadership presence and executive gravitas',
                    'Master strategic thinking and decision-making frameworks',
                    'Build high-performing teams through inspirational leadership',
                    'Navigate organizational change with confidence and vision',
                    'Cultivate emotional intelligence and empathetic leadership',
                    'Create inclusive and diverse leadership environments',
                    'Establish personal leadership philosophy and values'
                ],
                'Management': [
                    'Implement effective performance management systems',
                    'Optimize team productivity and operational efficiency',
                    'Master conflict resolution and difficult conversations',
                    'Develop data-driven decision making capabilities',
                    'Build coaching and mentoring skills for team development',
                    'Create positive workplace culture and employee engagement',
                    'Apply agile management methodologies and practices'
                ],
                'Communication': [
                    'Deliver compelling executive presentations with impact',
                    'Master persuasive communication and influence techniques',
                    'Develop authentic storytelling and narrative skills',
                    'Navigate cross-cultural communication challenges',
                    'Build crisis communication and reputation management skills',
                    'Enhance digital communication and social media presence',
                    'Cultivate active listening and empathetic communication'
                ],
                'Technical': [
                    'Lead technical teams through digital transformation',
                    'Translate complex technical concepts for diverse audiences',
                    'Drive innovation and emerging technology adoption',
                    'Develop technology strategy and roadmap planning',
                    'Foster collaborative cross-functional partnerships',
                    'Build cybersecurity awareness and risk management',
                    'Champion data-driven decision making and analytics'
                ],
                'Personal Development': [
                    'Enhance self-awareness and emotional intelligence',
                    'Build resilience and stress management capabilities',
                    'Develop personal brand and professional presence',
                    'Create work-life integration and balance strategies',
                    'Establish clear career goals and development plans',
                    'Cultivate growth mindset and continuous learning habits',
                    'Build confidence and overcome imposter syndrome'
                ]
            };
            
            const outcomes = outcomeTemplates[category] || outcomeTemplates['Personal Development'];
            const selectedOutcomes = outcomes.sort(() => 0.5 - Math.random()).slice(0, 5);
            const formattedOutcomes = selectedOutcomes.map((outcome, index) => `${index + 1}. ${outcome}`).join('\n');
            
            outcomesTextarea.value = formattedOutcomes;
            
            // Enhanced visual feedback
            outcomesTextarea.style.background = 'linear-gradient(45deg, #f0f8ff, #e8f5e8)';
            outcomesTextarea.style.border = '2px solid #FF9800';
            
            setTimeout(() => {
                outcomesTextarea.style.background = '';
                outcomesTextarea.style.border = '';
            }, 3500);
            
            this.showToast('🎓 AI-generated learning outcomes ready!', 'success');
        }, 1200);
    }
}

// Global functions for HTML event handlers
function showSection(sectionId) {
    courseSystem.showSection(sectionId);
}

function filterCourses() {
    courseSystem.filterCourses();
}

function sortCourses() {
    courseSystem.sortCourses();
}

function resetForm() {
    courseSystem.resetForm();
}

function closeModal() {
    courseSystem.closeModal();
}

function generateAISuggestions() {
    courseSystem.generateAISuggestions();
}

function generateCourseName() {
    courseSystem.generateCourseName();
}

function generateCourseDescription() {
    courseSystem.generateCourseDescription();
}

function generateLearningOutcomes() {
    courseSystem.generateLearningOutcomes();
}

// Initialize the Course Management System when the page loads
let courseSystem;
document.addEventListener('DOMContentLoaded', function() {
    courseSystem = new CourseManagementSystem();
});
