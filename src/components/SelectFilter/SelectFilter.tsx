import cn from "classnames";
import { TECH_ARR_FILTER } from "../../helpers/const/Techs";
import { Tech } from "../../Types/Tech";
import "./SelectFilter.styles.css";

export const SelectFilter = ({
  techFilterApply,
  applyTechFilter,
}: {
  techFilterApply: Tech;
  applyTechFilter: Function;
}) => {


  return (
    <div className="select-filter" id="select-tech">
      <span>
        <img src={require(`../../assets/${techFilterApply.icon}`)} alt={techFilterApply.name} />
        {techFilterApply.name}
      </span>
      <ul className="select-filter-options">
        {TECH_ARR_FILTER.map(({ key, name, icon }) => (
          <li
            key={`tech-${key}`}
            onClick={() => applyTechFilter(key)}
            className={cn({
              option: true,
              "option-selected": techFilterApply.key === key,
            })}
          >
            <span>
              <img src={require(`../../assets/${icon}`)} alt={name} />
              {name}
            </span>
          </li>
        ))}
      </ul>
      <img className="select-filter-icon" src={require("../../assets/image-down-chevron.png")} />
    </div>
  );
};
