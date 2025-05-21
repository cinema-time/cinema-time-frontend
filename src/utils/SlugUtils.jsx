
export function createEventSlug(event) {
    return event.title.toLowerCase().replace(/\s+/g, "-");
  }
  
  export function convertSlugToName(slug) {
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }