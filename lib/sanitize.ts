/**
 * Data sanitization utilities for frontend
 * Sanitizes user input before sending to backend API
 */

/**
 * Sanitize string input - removes dangerous characters and trims whitespace
 */
export function sanitizeString(input: string | undefined | null, maxLength?: number): string {
    if (!input || typeof input !== 'string') return '';
    
    // Trim whitespace
    let sanitized = input.trim();
    
    // Remove null bytes and control characters (except newlines and tabs)
    sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
    
    // Apply max length if specified
    if (maxLength && sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

/**
 * Sanitize email - validates and cleans email address
 */
export function sanitizeEmail(email: string | undefined | null): string {
    if (!email || typeof email !== 'string') return '';
    
    // Trim and convert to lowercase
    const sanitized = email.trim().toLowerCase();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) {
        return '';
    }
    
    // Remove any dangerous characters
    return sanitized.replace(/[<>\"']/g, '');
}

/**
 * Sanitize phone number - removes all non-digit characters and leading zeros
 */
export function sanitizePhone(phone: string | undefined | null): string {
    if (!phone || typeof phone !== 'string') return '';
    
    // Remove all non-digit characters
    let sanitized = phone.replace(/\D/g, '');
    
    // Remove leading zeros
    sanitized = sanitized.replace(/^0+/, '');
    
    return sanitized;
}

/**
 * Sanitize country code - ensures only digits, 1-4 digits
 */
export function sanitizeCountryCode(countryCode: string | undefined | null): string {
    if (!countryCode || typeof countryCode !== 'string') return '';
    
    // Remove all non-digit characters
    const digits = countryCode.replace(/\D/g, '');
    
    // Limit to 4 digits max
    return digits.substring(0, 4);
}

/**
 * Sanitize name - allows only letters, spaces, hyphens, and apostrophes
 */
export function sanitizeName(name: string | undefined | null): string {
    if (!name || typeof name !== 'string') return '';
    
    // Trim whitespace
    let sanitized = name.trim();
    
    // Remove any characters that aren't letters, spaces, hyphens, or apostrophes
    sanitized = sanitized.replace(/[^a-zA-Z\s\-']/g, '');
    
    // Remove multiple consecutive spaces
    sanitized = sanitized.replace(/\s+/g, ' ');
    
    return sanitized;
}

/**
 * Sanitize text area - removes dangerous characters, limits length
 */
export function sanitizeText(text: string | undefined | null, maxLength?: number): string {
    if (!text || typeof text !== 'string') return '';
    
    // Trim whitespace
    let sanitized = text.trim();
    
    // Remove null bytes and control characters (keep newlines and tabs)
    sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
    
    // Remove script tags and dangerous HTML
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    
    // Apply max length if specified
    if (maxLength && sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

/**
 * Sanitize contact form data before sending to backend
 */
export function sanitizeContactFormData(data: any): any {
    if (!data || typeof data !== 'object') return {};
    
    const sanitized: any = {};
    
    // Required fields
    if (data.name) {
        sanitized.name = sanitizeName(data.name);
    }
    
    if (data.email) {
        sanitized.email = sanitizeEmail(data.email);
    }
    
    if (data.countryCode) {
        sanitized.countryCode = sanitizeCountryCode(data.countryCode);
    }
    
    if (data.phone) {
        sanitized.phone = sanitizePhone(data.phone);
    }
    
    if (data.projectDescription) {
        sanitized.projectDescription = sanitizeText(data.projectDescription, 5000);
    }
    
    // Optional fields
    if (data.company) {
        sanitized.company = sanitizeString(data.company, 255);
    }
    
    if (data.budget) {
        sanitized.budget = sanitizeString(data.budget, 50);
    }
    
    if (data.timeline) {
        sanitized.timeline = sanitizeString(data.timeline, 50);
    }
    
    if (data.customBudget) {
        // Custom budget should only contain numbers
        sanitized.customBudget = sanitizePhone(data.customBudget).substring(0, 100);
    }
    
    // Numeric fields - ensure they're valid numbers
    if (data.timeOnPage !== undefined) {
        sanitized.timeOnPage = typeof data.timeOnPage === 'number' ? Math.max(0, data.timeOnPage) : undefined;
    }
    
    if (data.formFillDuration !== undefined) {
        sanitized.formFillDuration = typeof data.formFillDuration === 'number' ? Math.max(0, data.formFillDuration) : undefined;
    }
    
    if (data.pageViews !== undefined) {
        sanitized.pageViews = typeof data.pageViews === 'number' ? Math.max(1, data.pageViews) : undefined;
    }
    
    if (data.scrollDepth !== undefined) {
        sanitized.scrollDepth = typeof data.scrollDepth === 'number' ? Math.max(0, Math.min(100, data.scrollDepth)) : undefined;
    }
    
    if (data.formAbandonmentAttempts !== undefined) {
        sanitized.formAbandonmentAttempts = typeof data.formAbandonmentAttempts === 'number' ? Math.max(0, data.formAbandonmentAttempts) : undefined;
    }
    
    if (data.visitNumber !== undefined) {
        sanitized.visitNumber = typeof data.visitNumber === 'number' ? Math.max(1, data.visitNumber) : undefined;
    }
    
    if (data.previousVisits !== undefined) {
        sanitized.previousVisits = typeof data.previousVisits === 'number' ? Math.max(0, data.previousVisits) : undefined;
    }
    
    // String fields with max lengths
    if (data.sessionId) {
        sanitized.sessionId = sanitizeString(data.sessionId, 255);
    }
    
    if (data.deviceType) {
        sanitized.deviceType = sanitizeString(data.deviceType, 50);
    }
    
    if (data.screenResolution) {
        sanitized.screenResolution = sanitizeString(data.screenResolution, 50);
    }
    
    if (data.browserName) {
        sanitized.browserName = sanitizeString(data.browserName, 100);
    }
    
    if (data.browserVersion) {
        sanitized.browserVersion = sanitizeString(data.browserVersion, 50);
    }
    
    if (data.operatingSystem) {
        sanitized.operatingSystem = sanitizeString(data.operatingSystem, 100);
    }
    
    if (data.language) {
        sanitized.language = sanitizeString(data.language, 10);
    }
    
    // Boolean fields
    if (typeof data.isMobile === 'boolean') {
        sanitized.isMobile = data.isMobile;
    }
    
    if (typeof data.isTablet === 'boolean') {
        sanitized.isTablet = data.isTablet;
    }
    
    // Geographic fields
    if (data.country) {
        sanitized.country = sanitizeString(data.country, 100);
    }
    
    if (data.region) {
        sanitized.region = sanitizeString(data.region, 100);
    }
    
    if (data.city) {
        sanitized.city = sanitizeString(data.city, 100);
    }
    
    if (data.timezone) {
        sanitized.timezone = sanitizeString(data.timezone, 50);
    }
    
    if (data.currency) {
        sanitized.currency = sanitizeString(data.currency, 10);
    }
    
    // Marketing fields
    if (data.landingPage) {
        sanitized.landingPage = sanitizeString(data.landingPage, 500);
    }
    
    if (data.entryPoint) {
        sanitized.entryPoint = sanitizeString(data.entryPoint, 50);
    }
    
    if (data.campaignId) {
        sanitized.campaignId = sanitizeString(data.campaignId, 100);
    }
    
    if (data.adGroup) {
        sanitized.adGroup = sanitizeString(data.adGroup, 255);
    }
    
    if (data.keyword) {
        sanitized.keyword = sanitizeString(data.keyword, 255);
    }
    
    if (data.gclid) {
        sanitized.gclid = sanitizeString(data.gclid, 255);
    }
    
    if (data.fbclid) {
        sanitized.fbclid = sanitizeString(data.fbclid, 255);
    }
    
    if (data.sessionStartTime) {
        sanitized.sessionStartTime = sanitizeString(data.sessionStartTime, 50);
    }
    
    // Lead quality fields
    if (data.projectType) {
        sanitized.projectType = sanitizeString(data.projectType, 100);
    }
    
    if (data.industry) {
        sanitized.industry = sanitizeString(data.industry, 100);
    }
    
    if (data.companySize) {
        sanitized.companySize = sanitizeString(data.companySize, 50);
    }
    
    if (typeof data.decisionMaker === 'boolean') {
        sanitized.decisionMaker = data.decisionMaker;
    }
    
    if (data.urgency) {
        sanitized.urgency = sanitizeString(data.urgency, 20);
    }
    
    if (data.estimatedValue !== undefined) {
        sanitized.estimatedValue = typeof data.estimatedValue === 'number' ? Math.max(0, data.estimatedValue) : undefined;
    }
    
    // Project context fields
    if (data.projectCategory) {
        sanitized.projectCategory = sanitizeString(data.projectCategory, 100);
    }
    
    if (Array.isArray(data.techStack)) {
        sanitized.techStack = data.techStack
            .filter(item => typeof item === 'string')
            .map(item => sanitizeString(item, 100))
            .filter(item => item.length > 0);
    }
    
    if (data.teamSize !== undefined) {
        sanitized.teamSize = typeof data.teamSize === 'number' ? Math.max(1, data.teamSize) : undefined;
    }
    
    if (typeof data.hasExistingSystem === 'boolean') {
        sanitized.hasExistingSystem = data.hasExistingSystem;
    }
    
    if (Array.isArray(data.integrationRequirements)) {
        sanitized.integrationRequirements = data.integrationRequirements
            .filter(item => typeof item === 'string')
            .map(item => sanitizeString(item, 255))
            .filter(item => item.length > 0);
    }
    
    if (Array.isArray(data.complianceNeeds)) {
        sanitized.complianceNeeds = data.complianceNeeds
            .filter(item => typeof item === 'string')
            .map(item => sanitizeString(item, 255))
            .filter(item => item.length > 0);
    }
    
    // Communication preferences
    if (data.preferredContactMethod) {
        sanitized.preferredContactMethod = sanitizeString(data.preferredContactMethod, 50);
    }
    
    if (data.preferredContactTime) {
        sanitized.preferredContactTime = sanitizeString(data.preferredContactTime, 50);
    }
    
    if (data.communicationLanguage) {
        sanitized.communicationLanguage = sanitizeString(data.communicationLanguage, 10);
    }
    
    if (typeof data.newsletterOptIn === 'boolean') {
        sanitized.newsletterOptIn = data.newsletterOptIn;
    }
    
    if (typeof data.projectUpdatesOptIn === 'boolean') {
        sanitized.projectUpdatesOptIn = data.projectUpdatesOptIn;
    }
    
    // Business context
    if (data.businessStage) {
        sanitized.businessStage = sanitizeString(data.businessStage, 50);
    }
    
    if (data.fundingStage) {
        sanitized.fundingStage = sanitizeString(data.fundingStage, 50);
    }
    
    if (data.annualRevenue) {
        sanitized.annualRevenue = sanitizeString(data.annualRevenue, 100);
    }
    
    if (Array.isArray(data.competitors)) {
        sanitized.competitors = data.competitors
            .filter(item => typeof item === 'string')
            .map(item => sanitizeString(item, 255))
            .filter(item => item.length > 0);
    }
    
    if (Array.isArray(data.painPoints)) {
        sanitized.painPoints = data.painPoints
            .filter(item => typeof item === 'string')
            .map(item => sanitizeString(item, 255))
            .filter(item => item.length > 0);
    }
    
    return sanitized;
}

