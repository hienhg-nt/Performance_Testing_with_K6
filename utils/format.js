export function toSlug(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');
}

export function cleanSlug(slug) {
    slug = toSlug(slug);
    return slug
        .replace(/[^a-z0-9-]/g, '')  
        .replace(/-+/g, '-')          
        .replace(/^-|-$/g, '');      
}