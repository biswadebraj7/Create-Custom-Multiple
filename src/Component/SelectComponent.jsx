
import { CiSearch } from "react-icons/ci";
import '../App.css';
import {  useRef, useState } from "react";

const SelectComponent = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [onMenuOpen, setonMenuOpen] = useState(false);
  const [searchText, setSearchText]=useState('');
  const inputRef= useRef([])



  const onChangeHandler=(e)=>{
    setSearchText(e.target.value.trimStart());
  
  }


  const options = [
    "Tutorial",
    "JavaScript",
    "NodeJS",
    "Review",
    "Technology",
    "Gaming",
    "Java",
    "ReactJS",
    "ExpressJs",
    "MongoDB",
  ];

  const filteredoptions= options.filter((option)=>option?.toLocaleLowerCase()?.includes(searchText.toLocaleLowerCase()?.trim()) &&
!selectedValues.includes(option));
const isDisabled = !searchText.trim() || selectedValues.filter((option)=>
  option?.toLocaleLowerCase()?.trim()=== searchText?.toLocaleLowerCase()?.trim()
)?.length;


  return (
    <div>
    
         {/* <div className={`kzui-select ${isOpen ? 'kzui-select--open' : ''} ${isDisabled ? 'kzui-select--disabled' : ''}`}> */}
     <div className='kxui-body'>
     <section className="kxui-select-value">
        {
          selectedValues?.length ? (
            <div className="kxui-data">
              {selectedValues.map((option)=>{
                return <div className="kxui-data-desgin">
                  {option}
                  <span className="" onMouseDown={(e)=>e.preventDefault()}
                  onClick={()=>setSelectedValues(selectedValues.filter((item)=>item !== option))}
                    >X</span>
                </div>
              })}
              <div className="kxui-clear-data">
                <span className=" kxui-clear"
                onClick={()=>{
                  setSelectedValues([])
                  inputRef.current?.focus();
                }}
                >Clear All</span>

              </div>
            </div>
          ):null
        }

      </section>
            <div className="kxui-input-box">
            <span className="kxui-search" > <CiSearch /> </span>
            <input className="kxui-input" type="text" placeholder='Search your data'
            value={searchText}
            ref={inputRef}
            onChange={onChangeHandler}
         
            onFocus={()=>setonMenuOpen(true)}
            onBlur={()=>setonMenuOpen(false)}
            onKeyDown={(e)=>{
              if(e.key=== 'Enter' && !isDisabled){
                setSelectedValues((prev)=>[...prev, searchText]);
                setSearchText("");
                setonMenuOpen(true)
              }
            }}
            
            />
            <button className="kxui-add"
            disabled={isDisabled}
             onClick={()=>{
              if(isDisabled){
                return;
              }
              setSelectedValues((value)=>[...value, searchText]);
              setSearchText("");
              inputRef.current?.focus();
              setonMenuOpen(true)

            }}>Add</button>
            </div>
            

          {
            onMenuOpen ?  <div>
            <ul className=" kxui-list">
            {

              filteredoptions?.length ? filteredoptions.map((option)=>
                <li key={option} className="kxui-list-item"
              onMouseDown={(e)=>e.preventDefault()}
              onClick={()=>{

                setonMenuOpen(true);
                setSelectedValues((prev)=>[...prev, option])
              }

              }
             
                
                >{option}</li>
              ):(
                <li  className="kxui-list-item">No options available</li>
              )}
            </ul>
            </div>: null
          }
            
    </div>
      
    </div>
  )
}

export default SelectComponent

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import "../Css/Style.css"

// const SelectComponent = ({
//   isClearable,
//   isSearchable,
//   isDisabled,
//   options,
//   value,
//   placeholder,
//   isGrouped,
//   isMulti,
//   onChangeHandler,
//   onMenuOpen,
//   onSearchHandler,
// }) => {
//   const [selectedValues, setSelectedValues] = useState(value || []);
//   const [searchText, setSearchText] = useState('');
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (onSearchHandler) {
//       onSearchHandler(searchText);
//     }
//   }, [searchText, onSearchHandler]);

//   const handleSelect = (option) => {
//     if (isMulti) {
//       setSelectedValues(prevValues => {
//         const newValues = prevValues.includes(option) 
//           ? prevValues.filter(val => val !== option)
//           : [...prevValues, option];
//         onChangeHandler(newValues);
//         return newValues;
//       });
//     } else {
//       setSelectedValues([option]);
//       onChangeHandler(option);
//       setIsOpen(false);
//     }
//   };

//   const handleClear = () => {
//     setSelectedValues([]);
//     onChangeHandler([]);
//   };

//   const handleSearchChange = (e) => {
//     setSearchText(e.target.value);
//   };

//   const handleToggle = () => {
//     setIsOpen(prev => !prev);
//     if (onMenuOpen) onMenuOpen();
//   };

//   const filteredOptions = options.filter(option => 
//     option.label.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div className={`kzui-select ${isOpen ? 'kzui-select--open' : ''} ${isDisabled ? 'kzui-select--disabled' : ''}`}>
//       <div 
//         className="kzui-select__control"
//         onClick={handleToggle}
//       >
//         <div className="kzui-select__value">
//           {selectedValues.length > 0 ? (
//             isMulti ? (
//               selectedValues.join(', ')
//             ) : (
//               selectedValues[0]
//             )
//           ) : (
//             <span className="kzui-select__placeholder">{placeholder}</span>
//           )}
//         </div>
//         {isClearable && selectedValues.length > 0 && (
//           <button 
//             className="kzui-select__clear-btn"
//             onClick={handleClear}
//           >
//             &times;
//           </button>
//         )}
//         {isSearchable && (
//           <input
//             type="text"
//             className="kzui-select__search"
//             placeholder="Search..."
//             value={searchText}
//             onChange={handleSearchChange}
//           />
//         )}
//       </div>
//       {isOpen && !isDisabled && (
//         <div className="kzui-select__menu">
//           {isGrouped ? (
//             filteredOptions.map(group => (
//               <div key={group.label} className="kzui-select__group">
//                 <div className="kzui-select__group-label">{group.label}</div>
//                 {group.options.map(option => (
//                   <div
//                     key={option}
//                     className="kzui-select__option"
//                     onClick={() => handleSelect(option)}
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             ))
//           ) : (
//             filteredOptions.map(option => (
//               <div
//                 key={option}
//                 className="kzui-select__option"
//                 onClick={() => handleSelect(option)}
//               >
//                 {option}
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// SelectComponent.propTypes = {
//   isClearable: PropTypes.bool,
//   isSearchable: PropTypes.bool,
//   isDisabled: PropTypes.bool,
//   options: PropTypes.arrayOf(PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       options: PropTypes.arrayOf(PropTypes.string).isRequired
//     })
//   ])).isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string)
//   ]),
//   placeholder: PropTypes.string,
//   isGrouped: PropTypes.bool,
//   isMulti: PropTypes.bool,
//   onChangeHandler: PropTypes.func.isRequired,
//   onMenuOpen: PropTypes.func,
//   onSearchHandler: PropTypes.func
// };

// SelectComponent.defaultProps = {
//   isClearable: false,
//   isSearchable: false,
//   isDisabled: false,
//   value: [],
//   placeholder: 'Select...',
//   isGrouped: false,
//   isMulti: false,
//   onMenuOpen: null,
//   onSearchHandler: null
// };

// export default SelectComponent;
