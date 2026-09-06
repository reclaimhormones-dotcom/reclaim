import type { DocSpec, FieldSpec } from "@/components/admin/DocEditor";

/* ------------------------------ reusable specs ---------------------------- */

const iconItemFields: FieldSpec[] = [
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "sub", label: "Description", type: "textarea" },
];

const numberedItemFields: FieldSpec[] = [
  { key: "n", label: "Step number", type: "text" },
  ...iconItemFields,
]; 
 
const slideFields: FieldSpec[] = [
  { key: "img", label: "Image", type: "image" }, 
  { key: "alt", label: "Alt text", type: "text" },
  { key: "caption", label: "Caption", type: "text" },
  {
    key: "position", 
    label: "Focal point",
    type: "text",
    hint: 'Tailwind object-position, e.g. object-[50%_12%]',
  },
]; 

const mobileHeroFields: FieldSpec[] = [
  { key: "img", label: "Background image", type: "image" },
  { key: "alt", label: "Alt text", type: "text" },
  { key: "eyebrow", label: "Eyebrow", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "titleAccent", label: "Title accent", type: "text" },
  { key: "subtitle", label: "Subtitle", type: "textarea" },
  { key: "primaryLabel", label: "Primary button", type: "text" },
  { key: "secondaryLabel", label: "Secondary link", type: "text" },
  { key: "position", label: "Focal point", type: "text" },
];

/* ------------------------------- navigation ------------------------------- */

export const NAVIGATION_SPEC: DocSpec = {
  collection: "navigation",
  id: "main",
  title: "Navigation",
  sub: "Logo, menu labels, links and the header button.",
  fields: [
    { key: "logo", label: "Logo", type: "image" },
    { key: "logoAlt", label: "Logo alt text", type: "text" },
    {
      key: "items",
      label: "Menu items",
      type: "list",
      itemLabel: "menu item",
      fields: [
        { key: "label", label: "Label", type: "text" },
        { key: "to", label: "Link", type: "link" },
      ],
    },
    { key: "buttonLabel", label: "Header button label", type: "text" },
    { key: "buttonTo", label: "Header button link", type: "link" },
    { key: "menuEyebrow", label: "Mobile menu eyebrow", type: "text" },
    { key: "menuHeading", label: "Mobile menu heading", type: "text" },
    { key: "menuHeadingAccent", label: "Mobile menu heading accent", type: "text" },
    { key: "menuFooterText", label: "Mobile menu footer text", type: "textarea" },
    { key: "menuFollowLabel", label: '"Follow us" label', type: "text" },
  ],
};

/* --------------------------------- footer --------------------------------- */

export const FOOTER_SPEC: DocSpec = {
  collection: "pages",
  id: "footer",
  title: "Footer",
  sub: "Logo, description, quick links, program links and copyright.",
  fields: [
    { key: "logo", label: "Logo", type: "image" },
    { key: "tagline", label: "Tagline", type: "text" },
    { key: "blurb", label: "Description", type: "textarea" },
    { key: "quickLinksHeading", label: "Quick links heading", type: "text" },
    {
      key: "quickLinks",
      label: "Quick links",
      type: "list",
      itemLabel: "link",
      fields: [
        { key: "label", label: "Label", type: "text" },
        { key: "to", label: "Link", type: "link" },
      ],
    },
    { key: "programsHeading", label: "Programs heading", type: "text" },
    { key: "programLinks", label: "Program links", type: "strings" },
    { key: "contactHeading", label: "Contact heading", type: "text" },
    { key: "copyright", label: "Copyright", type: "text" },
  ],
};

/* -------------------------------- home page ------------------------------- */

export const HOME_SPEC: DocSpec = {
  collection: "pages",
  id: "homepage",
  title: "Home Page",
  sub: "Hero slideshow, statistics, philosophy, previews, journey steps and CTAs.",
  fields: [
    {
      key: "hero",
      label: "Hero",
      type: "group",
      fields: [
        { key: "mobileTitle", label: "Mobile title", type: "text" },
        { key: "mobileTitleAccent", label: "Mobile title accent", type: "text" },
        { key: "mobileSubtitle", label: "Mobile subtitle", type: "textarea" },
        { key: "mobilePrimaryLabel", label: "Mobile primary button", type: "text" },
        { key: "mobileSecondaryLabel", label: "Mobile secondary link", type: "text" },
        { key: "badge", label: "Desktop badge", type: "text" },
        { key: "title", label: "Desktop title", type: "text" },
        { key: "titleAccent", label: "Desktop title accent", type: "text" },
        { key: "subtitle", label: "Desktop subtitle", type: "textarea" },
        { key: "primaryLabel", label: "Desktop primary button", type: "text" },
        { key: "secondaryLabel", label: "Desktop secondary button", type: "text" },
        { key: "scrollLabel", label: "Scroll cue label", type: "text" },
        {
          key: "mobileSlides",
          label: "Mobile slideshow",
          type: "list",
          itemLabel: "slide",
          fields: slideFields,
        },
        {
          key: "desktopSlides",
          label: "Desktop slideshow",
          type: "list",
          itemLabel: "slide",
          fields: slideFields,
        },
      ],
    },
    {
      key: "stats",
      label: "Statistics",
      type: "list",
      itemLabel: "stat",
      fields: [
        { key: "icon", label: "Icon", type: "icon" },
        { key: "title", label: "Value", type: "text" },
        { key: "sub", label: "Label", type: "text" },
      ],
    },
    {
      key: "philosophy",
      label: "Philosophy",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "items", label: "Pillars", type: "list", itemLabel: "pillar", fields: iconItemFields },
      ],
    },
    {
      key: "programs",
      label: "Programs preview (cards come from Programs)",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "ctaLabel", label: "Button label", type: "text" },
        { key: "emptyLabel", label: "Text when no programs are published", type: "textarea" },
      ],
    },
    {
      key: "about",
      label: "About preview",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "image", label: "Portrait", type: "image" },
        { key: "imageAlt", label: "Portrait alt text", type: "text" },
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "degree", label: "Qualification", type: "text" },
        { key: "ctaLabel", label: "Button label", type: "text" },
        { key: "pillars", label: "Pillars", type: "list", itemLabel: "pillar", fields: iconItemFields },
      ],
    },
    {
      key: "testimonials",
      label: "Testimonials preview",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        {
          key: "items",
          label: "Fallback testimonials",
          type: "list",
          itemLabel: "testimonial",
          fields: [
            { key: "quote", label: "Quote", type: "textarea" },
            { key: "name", label: "Name", type: "text" },
            { key: "program", label: "Program", type: "text" },
          ],
        },
      ],
    },
    {
      key: "journey",
      label: "Journey steps",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        { key: "steps", label: "Steps", type: "list", itemLabel: "step", fields: numberedItemFields },
        { key: "ctaLabel", label: "Button label", type: "text" },
      ],
    },
    {
      key: "gallery",
      label: "Gallery preview",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "ctaLabel", label: "Button label", type: "text" },
        {
          key: "images",
          label: "Fallback images",
          type: "list",
          itemLabel: "image",
          fields: [
            { key: "img", label: "Image", type: "image" },
            { key: "alt", label: "Alt text", type: "text" },
          ],
        },
      ],
    },
    {
      key: "cta",
      label: "Footer CTA",
      type: "group",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "primaryLabel", label: "Primary button", type: "text" },
        { key: "orLabel", label: '"or" label', type: "text" },
        { key: "whatsappLabel", label: "WhatsApp button", type: "text" },
      ],
    },
    {
      key: "mobileContact",
      label: "Mobile contact block",
      type: "group",
      fields: [
        { key: "callLabel", label: "Call label", type: "text" },
        { key: "emailLabel", label: "Email label", type: "text" },
        { key: "locationLabel", label: "Location label", type: "text" },
        { key: "timingsLabel", label: "Timings label", type: "text" },
        { key: "socialHeading", label: "Social heading", type: "text" },
        { key: "quickLinksHeading", label: "Quick links heading", type: "text" },
      ],
    },
  ],
};

/* ------------------------------- about page ------------------------------- */

export const ABOUT_SPEC: DocSpec = {
  collection: "pages",
  id: "aboutpage",
  title: "About Page",
  sub: "Story, mission, vision, doctor profile, timeline, values, credentials and images.",
  fields: [
    { key: "mobileHero", label: "Mobile hero", type: "group", fields: mobileHeroFields },
    {
      key: "hero",
      label: "Desktop hero",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "titleAccent", label: "Title accent", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "ctaLabel", label: "Button label", type: "text" },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt text", type: "text" },
        { key: "name", label: "Doctor name", type: "text" },
        { key: "degree", label: "Qualification", type: "text" },
        { key: "role", label: "Role", type: "text" },
        { key: "points", label: "Highlights", type: "list", itemLabel: "highlight", fields: iconItemFields },
      ],
    },
    {
      key: "mission",
      label: "Mission & specialities",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        { key: "headingEnd", label: "Heading second line", type: "text" },
        { key: "paragraphs", label: "Paragraphs", type: "strings" },
        { key: "specialityHeading", label: "Specialities heading", type: "text" },
        {
          key: "specialities",
          label: "Specialities",
          type: "list",
          itemLabel: "speciality",
          fields: iconItemFields,
        },
      ],
    },
    {
      key: "story",
      label: "Story, timeline, mission & vision",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt text", type: "text" },
        {
          key: "timeline",
          label: "Timeline",
          type: "list",
          itemLabel: "milestone",
          fields: [
            { key: "icon", label: "Icon", type: "icon" },
            { key: "year", label: "Year (optional)", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "sub", label: "Description", type: "textarea" },
          ],
        },
        { key: "missionIcon", label: "Mission icon", type: "icon" },
        { key: "missionTitle", label: "Mission title", type: "text" },
        { key: "missionSub", label: "Mission text", type: "textarea" },
        { key: "visionIcon", label: "Vision icon", type: "icon" },
        { key: "visionTitle", label: "Vision title", type: "text" },
        { key: "visionSub", label: "Vision text", type: "textarea" },
      ],
    },
    {
      key: "philosophy",
      label: "Philosophy",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "items", label: "Items", type: "list", itemLabel: "item", fields: iconItemFields },
      ],
    },
    {
      key: "experts",
      label: "Experts",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        {
          key: "items",
          label: "Team",
          type: "list",
          itemLabel: "expert",
          fields: [
            { key: "img", label: "Photo", type: "image" },
            { key: "name", label: "Name", type: "text" },
            { key: "degree", label: "Qualification", type: "text" },
            { key: "role", label: "Role", type: "text" },
          ],
        },
      ],
    },
    {
      key: "process",
      label: "Treatment process",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "items", label: "Steps", type: "list", itemLabel: "step", fields: numberedItemFields },
      ],
    },
    {
      key: "trust",
      label: "Why families trust us",
      type: "group",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "items", label: "Items", type: "list", itemLabel: "item", fields: iconItemFields },
      ],
    },
    {
      key: "clinic",
      label: "Clinic experience",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        {
          key: "items",
          label: "Photos",
          type: "list",
          itemLabel: "photo",
          fields: [
            { key: "img", label: "Image", type: "image" },
            { key: "caption", label: "Caption", type: "text" },
          ],
        },
      ],
    },
    {
      key: "values",
      label: "Core values",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "items", label: "Values", type: "list", itemLabel: "value", fields: iconItemFields },
      ],
    },
    {
      key: "whyUs",
      label: "Why choose us & credentials",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "image", label: "Background image", type: "image" },
        { key: "points", label: "Reasons", type: "strings" },
        { key: "credentialsEyebrow", label: "Credentials eyebrow", type: "text" },
        {
          key: "credentials",
          label: "Credentials",
          type: "list",
          itemLabel: "credential",
          fields: iconItemFields,
        },
      ],
    },
    {
      key: "approach",
      label: "Our approach",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "items", label: "Steps", type: "list", itemLabel: "step", fields: numberedItemFields },
      ],
    },
    {
      key: "testimonials",
      label: "Testimonials",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        {
          key: "items",
          label: "Quotes",
          type: "list",
          itemLabel: "quote",
          fields: [
            { key: "quote", label: "Quote", type: "textarea" },
            { key: "name", label: "Name", type: "text" },
          ],
        },
      ],
    },
    {
      key: "cta",
      label: "Closing CTA",
      type: "group",
      fields: [
        { key: "mobileHeading", label: "Mobile heading", type: "text" },
        { key: "heading", label: "Desktop heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "primaryLabel", label: "Primary button", type: "text" },
        { key: "orLabel", label: '"or" label', type: "text" },
        { key: "whatsappLabel", label: "WhatsApp button", type: "text" },
      ],
    },
  ],
};

/* ------------------------------ programs page ----------------------------- */

export const PROGRAMS_PAGE_SPEC: DocSpec = {
  collection: "pages",
  id: "programspage",
  title: "Programs Page",
  sub: "Hero, section headings, approach, glimpses and CTA. Program cards live under Programs.",
  fields: [
    { key: "mobileHero", label: "Mobile hero", type: "group", fields: mobileHeroFields },
    {
      key: "hero",
      label: "Desktop hero",
      type: "group",
      fields: [
        { key: "badge", label: "Badge", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "subtitleAccent", label: "Subtitle accent", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt text", type: "text" },
        { key: "cardTitle", label: "Floating card title", type: "textarea" },
        { key: "cardSub", label: "Floating card text", type: "textarea" },
        { key: "points", label: "Highlights", type: "list", itemLabel: "highlight", fields: iconItemFields },
      ],
    },
    {
      key: "sections",
      label: "Program section headings",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "allLabel", label: "Filter: all", type: "text" },
        { key: "womenLabel", label: "Filter: women", type: "text" },
        { key: "menLabel", label: "Filter: men", type: "text" },
        { key: "womenHeading", label: "Women heading", type: "text" },
        { key: "womenAccent", label: "Women accent", type: "text" },
        { key: "menHeading", label: "Men heading", type: "text" },
        { key: "menAccent", label: "Men accent", type: "text" },
        { key: "learnMoreLabel", label: "Card link label", type: "text" },
        { key: "emptyHeading", label: "Empty state heading", type: "text" },
        { key: "emptyBody", label: "Empty state text", type: "textarea" },
        { key: "emptyCtaLabel", label: "Empty state button", type: "text" },
      ],
    },
    {
      key: "approach",
      label: "Approach",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt text", type: "text" },
        { key: "badge", label: "Circle badge text", type: "text" },
        { key: "items", label: "Steps", type: "list", itemLabel: "step", fields: iconItemFields },
      ],
    },
    {
      key: "glimpses",
      label: "Glimpses",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "ctaLabel", label: "Button label", type: "text" },
        {
          key: "items",
          label: "Photos",
          type: "list",
          itemLabel: "photo",
          fields: [
            { key: "img", label: "Image", type: "image" },
            { key: "alt", label: "Alt text", type: "text" },
          ],
        },
      ],
    },
    {
      key: "cta",
      label: "CTA band",
      type: "group",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "primaryLabel", label: "Primary button", type: "text" },
        { key: "secondaryLabel", label: "Secondary button", type: "text" },
        { key: "whatsappLabel", label: "WhatsApp button", type: "text" },
      ],
    },
  ],
};

/* ------------------------------ gallery page ------------------------------ */

export const GALLERY_PAGE_SPEC: DocSpec = {
  collection: "pages",
  id: "gallerypage",
  title: "Gallery Page",
  sub: "Hero, headings, impact stats, transformation stories and CTA. Photos live under Gallery.",
  fields: [
    { key: "mobileHero", label: "Mobile hero", type: "group", fields: mobileHeroFields },
    {
      key: "hero",
      label: "Desktop hero",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "titleAccent", label: "Title accent", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "primaryLabel", label: "Primary button", type: "text" },
        { key: "secondaryLabel", label: "Secondary button", type: "text" },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt text", type: "text" },
      ],
    },
    {
      key: "grid",
      label: "Photo grid headings",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
      ],
    },
    { key: "statsHeading", label: "Impact heading", type: "text" },
    {
      key: "stats",
      label: "Impact stats",
      type: "list",
      itemLabel: "stat",
      fields: [
        { key: "icon", label: "Icon", type: "icon" },
        { key: "value", label: "Value", type: "text" },
        { key: "label", label: "Label", type: "text" },
      ],
    },
    {
      key: "stories",
      label: "Transformation stories",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        {
          key: "items",
          label: "Stories",
          type: "list",
          itemLabel: "story",
          fields: [
            { key: "img", label: "Image", type: "image" },
            { key: "name", label: "Name", type: "text" },
            { key: "tag", label: "Tag", type: "text" },
            { key: "result", label: "Result", type: "text" },
            { key: "quote", label: "Quote", type: "textarea" },
          ],
        },
      ],
    },
    {
      key: "cta",
      label: "CTA",
      type: "group",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "primaryLabel", label: "Primary button", type: "text" },
        { key: "secondaryLabel", label: "Secondary button", type: "text" },
      ],
    },
  ],
};

/* ------------------------------ contact page ------------------------------ */

export const CONTACT_PAGE_SPEC: DocSpec = {
  collection: "pages",
  id: "contactpage",
  title: "Contact Page",
  sub: "Hero, contact cards, enquiry form, clinic hours, map and FAQs.",
  fields: [
    { key: "mobileHero", label: "Mobile hero", type: "group", fields: mobileHeroFields },
    {
      key: "hero",
      label: "Desktop hero",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "title", label: "Title", type: "text" },
        { key: "titleAccent", label: "Title accent", type: "text" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "whatsappLabel", label: "WhatsApp button", type: "text" },
        { key: "image", label: "Image", type: "image" },
        { key: "imageAlt", label: "Image alt text", type: "text" },
        {
          key: "assurances",
          label: "Assurances",
          type: "list",
          itemLabel: "assurance",
          fields: iconItemFields,
        },
      ],
    },
    {
      key: "cards",
      label: "Contact cards",
      type: "group",
      fields: [
        { key: "callTitle", label: "Call card title", type: "text" },
        { key: "callActionLabel", label: "Call action label", type: "text" },
        { key: "whatsappTitle", label: "WhatsApp card title", type: "text" },
        { key: "whatsappLine", label: "WhatsApp card line", type: "text" },
        { key: "whatsappActionLabel", label: "WhatsApp action label", type: "text" },
        { key: "emailTitle", label: "Email card title", type: "text" },
        { key: "emailActionLabel", label: "Email action label", type: "text" },
        { key: "visitTitle", label: "Visit card title", type: "text" },
        { key: "visitActionLabel", label: "Visit action label", type: "text" },
      ],
    },
    {
      key: "form",
      label: "Enquiry form",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "concerns", label: "Concern options", type: "strings" },
        { key: "modes", label: "Consultation modes", type: "strings" },
        { key: "submitLabel", label: "Submit button", type: "text" },
        { key: "disclaimer", label: "Disclaimer", type: "textarea" },
        { key: "successTitle", label: "Success title", type: "text" },
        { key: "successSub", label: "Success text", type: "textarea" },
        { key: "successAgainLabel", label: '"Send another" label', type: "text" },
      ],
    },
    {
      key: "side",
      label: "Clinic hours, map & Instagram",
      type: "group",
      fields: [
        { key: "image", label: "Clinic image", type: "image" },
        { key: "imageAlt", label: "Clinic image alt text", type: "text" },
        { key: "hoursHeading", label: "Hours heading", type: "text" },
        {
          key: "hours",
          label: "Working hours",
          type: "list",
          itemLabel: "row",
          fields: [
            { key: "day", label: "Days", type: "text" },
            { key: "time", label: "Time", type: "text" },
          ],
        },
        { key: "hoursNote", label: "Hours note", type: "textarea" },
        { key: "instagramTitle", label: "Instagram card title", type: "text" },
        { key: "instagramSub", label: "Instagram card text", type: "text" },
        { key: "mapEmbedUrl", label: "Google Map embed URL", type: "link" },
        { key: "mapTitle", label: "Map title", type: "text" },
      ],
    },
    {
      key: "faqs",
      label: "FAQs",
      type: "group",
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "heading", label: "Heading", type: "text" },
        { key: "headingAccent", label: "Heading accent", type: "text" },
        {
          key: "items",
          label: "Questions",
          type: "list",
          itemLabel: "FAQ",
          fields: [
            { key: "q", label: "Question", type: "text" },
            { key: "a", label: "Answer", type: "textarea" },
          ],
        },
      ],
    },
    {
      key: "cta",
      label: "CTA",
      type: "group",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "sub", label: "Description", type: "textarea" },
        { key: "primaryLabel", label: "Primary button", type: "text" },
        { key: "secondaryLabel", label: "Secondary button", type: "text" },
      ],
    },
  ],
};
