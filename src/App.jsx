
import { useState } from 'react'
import './App.css'

const initialProjects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'An online shopping platform with product listings and a shopping cart.',
    image: 'https://placehold.co/600x400?text=E-Commerce',
    technologies: ['React', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A simple application for organising tasks and tracking progress.',
    image: 'https://placehold.co/600x400?text=Task+Manager',
    technologies: ['React', 'JavaScript'],
    link: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A dashboard displaying weather information for different locations.',
    image: 'https://placehold.co/600x400?text=Weather',
    technologies: ['React', 'API', 'CSS'],
    link: '#',
  },
]

function Header() {
  return (
    <header>
      <h2>MyPortfolio</h2>
      <nav>
        <a href="#projects">Projects</a>
        <a href="#add-project">Add Project</a>
      </nav>
    </header>
  )
}

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search projects..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
      className="search-input"
    />
  )
}


function AddProjectForm({ onAddProject }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [technologies, setTechnologies] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const newProject = {
      id: Date.now(),
      title: title,
      description: description,
      image: image || 'https://placehold.co/600x400?text=New+Project',
      technologies: technologies.split(',').map((technology) => technology.trim()),
      link: '#',
    }

    onAddProject(newProject)

    setTitle('')
    setDescription('')
    setImage('')
    setTechnologies('')
  }

  return (
    <section id="add-project">
      <h2>Add a New Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <input
          type="text"
          placeholder="Technologies (e.g. React, CSS, JavaScript)"
          value={technologies}
          onChange={(event) => setTechnologies(event.target.value)}
          required
        />

        <button type="submit">Add Project</button>
      </form>
    </section>
  )
}


function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <img src={project.image} alt={project.title} />
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p>{project.technologies.join(' | ')}</p>
        <a href={project.link}>View Project</a>
      </div>
    </article>
  )
}

function ProjectList({ projects }) {
  return (
    <section id="projects">
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}

function App() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter((project) => {
    const searchText = searchTerm.toLowerCase()

    return (
      project.title.toLowerCase().includes(searchText) ||
      project.description.toLowerCase().includes(searchText) ||
      project.technologies.join(' ').toLowerCase().includes(searchText)
    )
  })

  function handleAddProject(newProject) {
  setProjects([...projects, newProject])
}

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <h1>Welcome to My Portfolio</h1>
          <p>Explore some of the projects I have worked on</p>
        </section>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <AddProjectForm onAddProject={handleAddProject} />

        <ProjectList projects={filteredProjects} />
      </main>
    </>
  )
}

export default App

