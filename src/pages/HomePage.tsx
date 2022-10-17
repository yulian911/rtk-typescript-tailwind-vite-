import React,{useState,useEffect} from 'react'
import RepoCard from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced =useDebounce(search)
  const {data,isLoading,isError,error} 
  =useSearchUsersQuery(debounced,{
    skip:debounced.length < 3,
    refetchOnFocus:true
  })

  const [fetchRepos,{isLoading:areReposLoading,data:repos}]=useLazyGetUserReposQuery()
  // console.log(data)


  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
    console.log(debounced)

  }, [debounced,data])
  
  const clickHandler =(username:string)=>{
    fetchRepos(username)
    setDropdown(false)
  }

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>SOmething went wrong</p>}
        <div className='relative w-[560px]'>
          <input 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className='border py-2 px-4 w-full h-[42px] mb-2'
            placeholder='Search for Github username'
          />
          {dropdown && <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
          {isLoading && <p className='text-center'>Loading...</p>}
          {data?.map(user=>(
            <li 
              onClick={()=>clickHandler(user.login)}
              key={user.id}
              className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
            
            >
                {user.login}
            </li>
          ))}
        </ul>}
        <div className='container'>
            {areReposLoading && <p className='text-center'>Repos are loading...</p>}
            {repos?.map(repo=>(
              <RepoCard key={repo.id}  repo={repo}/>
            ))}
        </div>
      </div>
      
      
    </div>
  )
}

export default HomePage