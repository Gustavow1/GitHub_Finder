import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ProjectsProps } from '../types/projects'
import BackBtn from '../components/BackBtn'
import Repositories from '../components/Repositories'
import Loader from '../components/Loader'
import styles from './Projects.module.css'


const Projects = () => {
  const [projects, setProjects] = useState<ProjectsProps[] | [] | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const { userid } = useParams()
  
  useEffect(() => {
    const loadProjects = async function (userid: string) {
      setIsLoading(true)

      const res = await fetch(`https://api.github.com/users/${userid}/repos`)
      const data = await res.json()

      setIsLoading(false)

      let orderedRepos = data.sort(
            (a: ProjectsProps, b: ProjectsProps) => b.stargazers_count - a.stargazers_count
          )
      orderedRepos = orderedRepos.slice(0, 5)
      setProjects(orderedRepos)
    }
    if (userid) {
      loadProjects(userid)
    }
  }, [])

  if (!projects && isLoading) return <Loader />
  
  return (
    <div className={styles.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {userid}</h2>
      {projects && projects.length === 0 && <p>Não há repositórios.</p>}
      {projects && projects.length > 0 && (
        <div className={styles.repos_container}>
          {projects.map((repo: ProjectsProps) => (
          <Repositories key={repo.name} {...repo} />
        ))}
        </div>
      )}
    </div>
  )
}

export default Projects