export const audiences = {
  all: { label: 'Everyone', heading: 'What I do and what I’m building.', description: 'My experience in IT and the project it inspired.', cta: 'A little about me', href: '#about' },
  employers: { label: 'Employers', heading: 'Get a feel for how I work.', description: 'I support IT in a manufacturing plant. Here’s my experience, how I approach problems, and a project I’m building from what I’ve learned.', cta: 'See my experience', href: '#experience' },
  clients: { label: 'Clients', heading: 'Tell me what you’re trying to do.', description: 'You can see how I approach technical problems here. If you have something you need help with, let’s talk it through.', cta: 'Tell me about it', href: '#contact' },
  creators: { label: 'Creators', heading: 'Have an idea you want to try?', description: 'I enjoy trying an idea and figuring things out as I go. If you’re working on something, I’d like to hear about it.', cta: 'Let’s talk about it', href: '#contact' },
};

export const projects = [
  { id: 'factorymemory', title: 'FactoryMemory', type: 'A project I’m building', status: 'In development', description: 'So the next technician doesn’t have to start from scratch.', tags: ['Software project', 'Manufacturing', 'AI-assisted development'], audiences: ['employers','clients','creators'], sections: [
    {title:'Why I started',text:'FactoryMemory started with a question from my work in manufacturing IT: how can we make it easier to find what fixed a device last time? A useful answer might already exist in an old ticket or in someone’s memory. I want to make it easier to find.'},
    {title:'What I want it to do',text:'I want a technician to find the device, explain what’s happening, and see relevant repair history without a lot of extra steps. It should fit into the work they already do.'},
    {title:'My part in it',text:'I’m shaping the idea and building the prototype with AI tools. I bring the perspective of someone doing IT support: what’s useful in the moment, what’s confusing, and what makes the job harder than it needs to be.'},
    {title:'Where it stands',text:'It’s still in development. I’m focused on making it easy to demonstrate and easy to use. I’m happy to talk about the problem it addresses; the source code and technical details stay private.'}
  ]},
  { id: 'it', title: 'My work in IT', type: 'IT support', status: 'What I do day to day', description: 'Helping people get back to work when the technology stops.', tags: ['Troubleshooting', 'Accounts & devices', 'Documentation'], audiences: ['employers','clients'], sections:[
    {title:'Where I work',text:'I’m an IT Support Technician with TEKsystems at a manufacturing site in Cleveland, Tennessee. I’ve been there since May 2024, helping keep the technology people rely on working.'},
    {title:'How I troubleshoot',text:'I start by asking what’s happening and what’s already been tried. Then I follow the problem, whether that means a device, an account, a network connection, or the cable in between. I want to understand why it failed.'},
    {title:'Leaving something useful behind',text:'Once something works again, I try to leave notes that the next person can actually use. In ServiceNow, that means explaining what happened, what I checked, and what helped.'},
    {title:'Before this',text:'I worked at Batteries Plus repairing consumer devices and helping customers. Explaining a problem clearly is a part of that work I still use every day.'}
  ]},
];

export function getAudience(key) {
  return Object.hasOwn(audiences, key) ? audiences[key] : audiences.all;
}
export function getProjects(key) {
  const resolved = Object.hasOwn(audiences, key) ? key : 'all';
  return projects.filter(project => resolved === 'all' || project.audiences.includes(resolved));
}
