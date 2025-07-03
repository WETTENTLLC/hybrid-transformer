// Enterprise SEO Lead Generation Engine
class EnterpriseSeOEngine {
    constructor() {
        this.domain = 'hybridxfmr.com';
        this.targetKeywords = [
            'hybrid transformers', 'AI data center transformers', 'energy saving transformers',
            'power quality transformers', 'harmonic filter transformers', 'enterprise transformers',
            'industrial power transformers', 'data center power solutions', 'energy efficient transformers',
            'smart grid transformers', 'renewable energy transformers', 'green power transformers'
        ];
        this.init();
    }

    init() {
        this.injectStructuredData();
        this.setupLeadCapture();
        this.trackUserBehavior();
        this.optimizeForConversion();
        this.setupAutomatedReporting();
    }

    injectStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AMC Hybrid Transformers",
            "url": "https://hybridxfmr.com",
            "logo": "https://hybridxfmr.com/images/hybrid-transformer.png",
            "description": "Leading provider of hybrid transformers that pay for themselves in 42 months through energy savings and harmonic filtering elimination.",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "sales"
            },
            "sameAs": [
                "https://linkedin.com/company/amc-hybrid-transformers"
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Hybrid Transformer Solutions",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Product",
                            "name": "Hybrid Power Transformer",
                            "description": "Revolutionary transformer technology that eliminates harmonic filters and reduces energy consumption by up to 7.6%",
                            "category": "Power Equipment",
                            "brand": "AMC Hybrid Transformers"
                        }
                    }
                ]
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    setupLeadCapture() {
        // Advanced lead scoring and capture
        this.trackHighValueActions();
        this.setupExitIntentCapture();
        this.implementSmartForms();
    }

    trackHighValueActions() {
        const highValueSelectors = [
            '[href*="contact"]', '[href*="quote"]', '.cta-button',
            '[href*="pdf"]', '[href*="whitepaper"]', '[href*="case-study"]'
        ];

        highValueSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener('click', (e) => {
                    this.recordLeadAction('high_value_click', {
                        element: selector,
                        page: window.location.pathname,
                        timestamp: Date.now()
                    });
                });
            });
        });
    }

    setupExitIntentCapture() {
        let exitIntentShown = false;
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                exitIntentShown = true;
                this.showExitIntentOffer();
            }
        });
    }

    showExitIntentOffer() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div style="background: #1a233a; padding: 40px; border-radius: 10px; max-width: 500px; text-align: center; color: #e0e0e0;">
                    <h2 style="color: #007bff; margin-bottom: 20px;">Wait! Don't Miss Out</h2>
                    <p style="font-size: 1.2em; margin-bottom: 25px;">Get our FREE ROI Calculator showing how Hybrid Transformers pay for themselves in 42 months!</p>
                    <form id="exitIntentForm" style="margin-bottom: 20px;">
                        <input type="email" placeholder="Enter your business email" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                        <input type="text" placeholder="Company name" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                        <button type="submit" style="background: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 1.1em; cursor: pointer;">Get FREE Calculator</button>
                    </form>
                    <button onclick="this.closest('div').remove()" style="background: none; border: none; color: #888; cursor: pointer;">No thanks, I'll pay more for energy</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('exitIntentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.captureExitIntentLead({
                email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
                company: formData.get('company') || e.target.querySelector('input[type="text"]').value,
                source: 'exit_intent',
                page: window.location.pathname
            });
            modal.remove();
        });
    }

    implementSmartForms() {
        // Progressive form enhancement
        document.querySelectorAll('form').forEach(form => {
            if (!form.classList.contains('seo-enhanced')) {
                form.classList.add('seo-enhanced');
                this.enhanceForm(form);
            }
        });
    }

    enhanceForm(form) {
        // Add hidden fields for tracking
        const hiddenFields = [
            { name: 'seo_source', value: this.getTrafficSource() },
            { name: 'seo_keyword', value: this.getCurrentKeyword() },
            { name: 'seo_page', value: window.location.pathname },
            { name: 'seo_timestamp', value: Date.now() }
        ];

        hiddenFields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });

        form.addEventListener('submit', (e) => {
            this.trackFormSubmission(form);
        });
    }

    getTrafficSource() {
        const referrer = document.referrer;
        if (referrer.includes('google')) return 'google_organic';
        if (referrer.includes('bing')) return 'bing_organic';
        if (referrer.includes('linkedin')) return 'linkedin';
        return 'direct';
    }

    getCurrentKeyword() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q') || urlParams.get('keyword') || 'direct';
    }

    trackUserBehavior() {
        // Advanced user behavior tracking
        let timeOnPage = 0;
        let scrollDepth = 0;
        let engagementScore = 0;

        setInterval(() => {
            timeOnPage += 1;
            if (timeOnPage > 30) engagementScore += 1; // 30+ seconds
            if (timeOnPage > 120) engagementScore += 2; // 2+ minutes
        }, 1000);

        window.addEventListener('scroll', () => {
            const currentScroll = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (currentScroll > scrollDepth) {
                scrollDepth = currentScroll;
                if (scrollDepth > 50) engagementScore += 1;
                if (scrollDepth > 80) engagementScore += 2;
            }
        });

        // Track when user becomes a qualified lead
        setInterval(() => {
            if (engagementScore >= 5 && !sessionStorage.getItem('qualified_lead')) {
                sessionStorage.setItem('qualified_lead', 'true');
                this.recordQualifiedLead({
                    timeOnPage,
                    scrollDepth,
                    engagementScore,
                    page: window.location.pathname
                });
            }
        }, 5000);
    }

    optimizeForConversion() {
        // Dynamic content optimization based on traffic source
        const source = this.getTrafficSource();
        const keyword = this.getCurrentKeyword();

        if (keyword.includes('AI') || keyword.includes('data center')) {
            this.emphasizeAIDataCenterBenefits();
        }
        
        if (keyword.includes('energy') || keyword.includes('saving')) {
            this.emphasizeEnergySavings();
        }

        if (source === 'linkedin') {
            this.emphasizeB2BBenefits();
        }
    }

    emphasizeAIDataCenterBenefits() {
        const hero = document.querySelector('.hero-section p');
        if (hero && !hero.textContent.includes('AI Data Centers')) {
            hero.textContent = 'Revolutionary Hybrid Transformers designed for AI Data Centers - Reduce power consumption by 7.6% and eliminate harmonic filters. ROI in 42 months guaranteed.';
        }
    }

    emphasizeEnergySavings() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(btn => {
            if (!btn.textContent.includes('Save')) {
                btn.textContent = 'Calculate Energy Savings';
            }
        });
    }

    emphasizeB2BBenefits() {
        const benefits = document.querySelector('.key-features ul');
        if (benefits) {
            const roiItem = document.createElement('li');
            roiItem.innerHTML = '<strong>42-Month ROI</strong> - Guaranteed payback period';
            benefits.insertBefore(roiItem, benefits.firstChild);
        }
    }

    recordLeadAction(action, data) {
        const leadData = {
            action,
            data,
            timestamp: Date.now(),
            page: window.location.pathname,
            source: this.getTrafficSource(),
            keyword: this.getCurrentKeyword()
        };

        // Send to analytics
        this.sendToAnalytics('lead_action', leadData);
        
        // Store locally
        const actions = JSON.parse(localStorage.getItem('leadActions') || '[]');
        actions.push(leadData);
        localStorage.setItem('leadActions', JSON.stringify(actions));
    }

    captureExitIntentLead(leadData) {
        leadData.leadScore = 85; // High score for exit intent
        leadData.estimatedValue = 420000; // Higher value for engaged users
        
        this.sendLeadToSystem(leadData);
        this.sendToAnalytics('exit_intent_lead', leadData);
    }

    recordQualifiedLead(data) {
        const leadData = {
            type: 'qualified_visitor',
            ...data,
            timestamp: Date.now(),
            source: this.getTrafficSource(),
            keyword: this.getCurrentKeyword(),
            leadScore: Math.min(100, data.engagementScore * 10)
        };

        this.sendToAnalytics('qualified_lead', leadData);
    }

    trackFormSubmission(form) {
        const formData = new FormData(form);
        const leadData = {
            type: 'form_submission',
            email: formData.get('email'),
            company: formData.get('company') || formData.get('organization'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            source: formData.get('seo_source'),
            keyword: formData.get('seo_keyword'),
            page: formData.get('seo_page'),
            leadScore: 95, // High score for form submissions
            estimatedValue: 350000
        };

        this.sendLeadToSystem(leadData);
    }

    sendLeadToSystem(leadData) {
        // Send to your CRM/lead system
        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        }).catch(() => {
            // Fallback: store locally if API fails
            const leads = JSON.parse(localStorage.getItem('seoLeads') || '[]');
            leads.push({ ...leadData, id: Date.now() });
            localStorage.setItem('seoLeads', JSON.stringify(leads));
        });

        // Notify team immediately
        this.notifyTeam(leadData);
    }

    notifyTeam(leadData) {
        // Real-time team notification
        if (window.seoTracker) {
            window.seoTracker.addLead(leadData);
        }
        
        console.log('🚨 NEW LEAD GENERATED:', leadData);
    }

    sendToAnalytics(event, data) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                custom_parameter_1: data.source,
                custom_parameter_2: data.keyword,
                value: data.estimatedValue || 0
            });
        }

        // Custom analytics endpoint
        fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, data, timestamp: Date.now() })
        }).catch(() => {
            // Store locally if API fails
            const analytics = JSON.parse(localStorage.getItem('seoAnalytics') || '[]');
            analytics.push({ event, data, timestamp: Date.now() });
            localStorage.setItem('seoAnalytics', JSON.stringify(analytics));
        });
    }

    setupAutomatedReporting() {
        // Daily automated reports
        setInterval(() => {
            this.generateDailyReport();
        }, 24 * 60 * 60 * 1000); // Every 24 hours

        // Real-time alerts for high-value leads
        this.setupHighValueAlerts();
    }

    generateDailyReport() {
        const leads = JSON.parse(localStorage.getItem('seoLeads') || '[]');
        const today = new Date().toISOString().split('T')[0];
        const todayLeads = leads.filter(lead => lead.date === today);
        
        const report = {
            date: today,
            totalLeads: todayLeads.length,
            estimatedRevenue: todayLeads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0),
            topKeywords: this.getTopKeywords(todayLeads),
            conversionRate: this.calculateConversionRate(todayLeads)
        };

        console.log('📊 Daily SEO Report:', report);
        
        // Send report to team (email, Slack, etc.)
        this.sendDailyReport(report);
    }

    getTopKeywords(leads) {
        const keywordCounts = {};
        leads.forEach(lead => {
            const keyword = lead.sourceKeyword || lead.keyword;
            keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });
        
        return Object.entries(keywordCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([keyword, count]) => ({ keyword, count }));
    }

    calculateConversionRate(leads) {
        const totalVisitors = parseInt(localStorage.getItem('dailyVisitors') || '100');
        return totalVisitors > 0 ? ((leads.length / totalVisitors) * 100).toFixed(2) : 0;
    }

    setupHighValueAlerts() {
        // Alert for leads over $500k estimated value
        const originalAddLead = this.sendLeadToSystem;
        this.sendLeadToSystem = (leadData) => {
            if (leadData.estimatedValue > 500000) {
                this.sendHighValueAlert(leadData);
            }
            originalAddLead.call(this, leadData);
        };
    }

    sendHighValueAlert(leadData) {
        // Send immediate alert for high-value leads
        console.log('🔥 HIGH VALUE LEAD ALERT:', leadData);
        
        // You can integrate with Slack, email, SMS, etc.
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🔥 High Value Lead!', {
                body: `${leadData.company || 'Unknown Company'} - $${leadData.estimatedValue.toLocaleString()}`,
                icon: '/images/hybrid-transformer.png'
            });
        }
    }

    sendDailyReport(report) {
        // Send to your reporting system
        fetch('/api/reports/daily', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(report)
        }).catch(() => {
            console.log('Report stored locally due to API unavailability');
        });
    }
}

// Initialize the SEO engine when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.seoEngine = new EnterpriseSeOEngine();
    
    // Track page view
    window.seoEngine.sendToAnalytics('page_view', {
        page: window.location.pathname,
        source: window.seoEngine.getTrafficSource(),
        keyword: window.seoEngine.getCurrentKeyword()
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnterpriseSeOEngine;
}