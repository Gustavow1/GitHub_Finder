import { ProjectsProps } from '../types/projects'
import { MdOutlineCode, MdOpenInNew } from 'react-icons/md'
import { AiOutlineStar, AiOutlineFork } from 'react-icons/ai'
import styles from './Repositories.module.css'

const Repositories = ({ name, language, stargazers_count, forks_count, html_url }: ProjectsProps) => {
  
  return (
    <div className={styles.repo}>
      <h3>{name}</h3>
      <p>
        <MdOutlineCode />
        {language}
      </p>
      <div className={styles.stats}>
        <div>
          <AiOutlineStar />
          <span>{stargazers_count}</span>
        </div>
        <div>
          <AiOutlineFork />
          <span>{forks_count}</span>
        </div>
      </div>
      <a href={html_url} target="_blank" className={styles.repo_btn}>
        <span>Ver código</span>
        <MdOpenInNew />
      </a>
    </div>
  )
}

export default Repositories