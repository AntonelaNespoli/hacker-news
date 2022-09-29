import cn from "classnames";
import "./FavesFilter.styles.css";

export const FavesFilter = ({ showFaves, toggleShowFaves } : { showFaves: boolean; toggleShowFaves: Function }) => {
  return (
    <div className='fav-filter-conteiner'>
        <button className={cn({'button':true, 'button-active':!showFaves})} onClick={()=> toggleShowFaves(false)} >All</button>
        <button className={cn({'button':true, 'button-active':showFaves})} onClick={()=> toggleShowFaves(true)} >My faves</button>
    </div>
  )
}
