// Iron Lady Course Management System
class CourseManagementSystem {
    constructor() {
        this.courses = this.loadCourses();
        this.currentEditId = null;
        this.filteredCourses = [...this.courses];
        
        this.initializeEventListeners();
        this.initializeStarRating();
        this.initializeApp();
        
        // AI-powered suggestions data
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
            "Global Leadership in Remote Teams"
        ];
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

    // AI-Powered Features
    generateAISuggestions() {
        const suggestionsList = document.getElementById('aiSuggestions');
        const randomSuggestions = this.getRandomSuggestions(3);
        
        suggestionsList.innerHTML = randomSuggestions.map(suggestion => `
            <div class="ai-suggestion-item">
                <i class="fas fa-lightbulb"></i> ${suggestion}
            </div>
        `).join('');
    }

    getRandomSuggestions(count) {
        const shuffled = [...this.aiSuggestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    generateCourseName() {
        const courseNameInput = document.getElementById('courseName');
        const category = document.getElementById('courseCategory').value;
        
        let suggestions = [];
        if (category === 'Leadership') {
            suggestions = [
                "Advanced Leadership Excellence Program",
                "Strategic Leadership Masterclass",
                "Executive Leadership Transformation",
                "Women Leadership Accelerator",
                "Global Leadership Excellence"
            ];
        } else if (category === 'Management') {
            suggestions = [
                "Modern Management Strategies",
                "Team Management Excellence",
                "Strategic Management Foundations",
                "Digital Age Management",
                "Innovation Management Program"
            ];
        } else if (category === 'Communication') {
            suggestions = [
                "Executive Communication Mastery",
                "Strategic Communication Skills",
                "Leadership Communication Excellence",
                "Digital Communication Strategies",
                "Cross-Cultural Communication"
            ];
        } else if (category === 'Technical') {
            suggestions = [
                "Digital Leadership for Tech Professionals",
                "Technology Management Excellence",
                "AI and Leadership Integration",
                "Digital Transformation Leadership",
                "Tech Leadership Fundamentals"
            ];
        } else {
            suggestions = [
                "Professional Development Accelerator",
                "Career Excellence Program",
                "Personal Leadership Journey",
                "Growth Mindset Development",
                "Excellence and Innovation Program"
            ];
        }
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        courseNameInput.value = randomSuggestion;
        
        // Add visual feedback
        courseNameInput.style.background = 'linear-gradient(45deg, #e3f2fd, #f3e5f5)';
        setTimeout(() => {
            courseNameInput.style.background = '';
        }, 2000);
        
        this.showToast('AI-generated course name suggestion applied!', 'success');
    }

    generateCourseDescription() {
        const descriptionTextarea = document.getElementById('courseDescription');
        const courseName = document.getElementById('courseName').value;
        const category = document.getElementById('courseCategory').value;
        const duration = document.getElementById('courseDuration').value;
        
        if (!courseName) {
            this.showToast('Please enter a course name first!', 'error');
            return;
        }
        
        const templates = {
            'Leadership': `This comprehensive ${duration}-hour program, "${courseName}", is designed to empower women leaders with advanced leadership skills and strategic thinking capabilities. Participants will develop executive presence, learn to navigate complex organizational challenges, and build the confidence needed to excel in senior leadership roles. The course combines theoretical frameworks with practical applications, case studies, and peer learning opportunities.`,
            
            'Management': `"${courseName}" is an intensive ${duration}-hour management program focusing on modern leadership practices and team optimization. This course covers strategic planning, performance management, team dynamics, and organizational effectiveness. Participants will learn evidence-based management techniques and develop skills in decision-making, conflict resolution, and change management.`,
            
            'Communication': `This ${duration}-hour program, "${courseName}", develops advanced communication skills essential for effective leadership. The course covers public speaking, executive presentation skills, difficult conversations, and strategic communication planning. Participants will enhance their ability to influence, persuade, and inspire teams while building authentic leadership presence.`,
            
            'Technical': `"${courseName}" is a ${duration}-hour program designed for technology professionals transitioning into leadership roles. The course bridges technical expertise with leadership skills, covering digital transformation, technology strategy, and leading technical teams. Participants will learn to communicate technical concepts to non-technical stakeholders and drive innovation in technology-focused organizations.`,
            
            'Personal Development': `This transformative ${duration}-hour program, "${courseName}", focuses on personal leadership and professional growth. Participants will develop self-awareness, emotional intelligence, and personal leadership philosophy. The course includes goal setting, career planning, work-life integration, and building resilience in leadership roles.`
        };
        
        const description = templates[category] || templates['Personal Development'];
        descriptionTextarea.value = description;
        
        // Add visual feedback
        descriptionTextarea.style.background = 'linear-gradient(45deg, #e8f5e8, #f0f8ff)';
        setTimeout(() => {
            descriptionTextarea.style.background = '';
        }, 2000);
        
        this.showToast('AI-generated course description applied!', 'success');
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

// Initialize the Course Management System when the page loads
let courseSystem;
document.addEventListener('DOMContentLoaded', function() {
    courseSystem = new CourseManagementSystem();
});
