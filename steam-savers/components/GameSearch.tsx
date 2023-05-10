import { Game } from '../types';
import React, { useState, useEffect } from 'react';
import { useCombobox } from 'downshift';
import styles from '../styles/page.module.css'

interface GameSearchProps {
  data: Game[];
  numClusters: number;
}

const GameSearch: React.FC<GameSearchProps> = ({ data, numClusters}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);


  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: filteredGames,
    selectedItem: selectedGame,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedGame(selectedItem || null);
    },
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || '');
    },
    itemToString: (item) => (item ? item.Name : ''),
  });

  useEffect(() => {
    const filtered = inputValue
      ? data.filter((game) =>
          game.Name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      : [];
    setFilteredGames(filtered);
  }, [inputValue, data]);

  return (
    <div style={{ 
      position: 'relative',
      border: '1px solid',
      borderColor: 'inherit',
      borderRadius: 'var(--chakra-radii-md)',
      width: '100%',
      }}
      >
      <input
        {...getInputProps({ placeholder: 'Enter title' })}
        type="text"
        style={{

        }}
        className={styles.search_bar}
      />
      <ul
        {...getMenuProps()}
        className={styles.dropdown_container}
      >
        {isOpen &&
          filteredGames.map((game, index) => (
            <li
              {...getItemProps({ item: game, index })}
              key={game.AppID}
              style={{
                padding: '0.5rem',
                backgroundColor:
                  highlightedIndex === index ? '#f0f0f0' : 'white',

              }}
            >
              {game.Name}
            </li>
          ))}
      </ul>
      {selectedItem && (
        <div
          style={{
            // border: '1px solid #ccc',
            // borderTop: '0px',
            // borderRadius: '0 0 4px 4px',
            marginTop: '0rem',
            padding: '0.5rem',
            background: '#EFF1F6'
          }}
        >
          <div style={{fontWeight: 600}}><a className={styles.pageLink} target="_blank" href={`https://store.steampowered.com/app/${selectedItem.AppID}`}>{selectedItem.Name}</a></div>
          {/* <div>Cluster: {selectedItem.Cluster} of {numClusters.toString()}</div> */}
          <div>Cluster {selectedItem.Cluster}</div>
          {/* <div>AppID: {selectedItem.AppID}</div> */}
          {/* <div><a className={styles.pageLink} target="_blank" href={`https://store.steampowered.com/app/${selectedItem.AppID}`}>Steam Page</a></div> */}
        </div>
      )}
    </div>
  );
};

export default GameSearch;



// import { Game } from '../types';
// import React, { useState, useEffect } from 'react';
// import { useCombobox } from 'downshift';

// interface GameSearchProps {
//   data: Game[];
//   onGameSelect: (game: Game | null) => void;
// }

// const GameSearch: React.FC<GameSearchProps> = ({ data, onGameSelect }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [filteredGames, setFilteredGames] = useState<Game[]>([]);

//   const {
//     isOpen,
//     getMenuProps,
//     getInputProps,
//     highlightedIndex,
//     getItemProps,
//   } = useCombobox({
//     items: filteredGames,
//     onInputValueChange: ({ inputValue }) => {
//       setInputValue(inputValue || '');
//     },
//     onSelectedItemChange: ({ selectedItem }) => {
//       onGameSelect(selectedItem || null);
//     },
//     itemToString: (item) => (item ? item.Name : ''),
//   });

//   useEffect(() => {
//     const filtered = inputValue
//       ? data.filter((game) =>
//           game.Name.toLowerCase().startsWith(inputValue.toLowerCase())
//         )
//       : [];
//     setFilteredGames(filtered);
//   }, [inputValue, data]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <input
//         {...getInputProps({ placeholder: 'Search games' })}
//         type="text"
//         style={{
//           width: '100%',
//           padding: '0.5rem',
//           fontSize: '1rem',
//           borderRadius: '4px',
//           border: '1px solid #ccc',
//         }}
//       />
//       <ul
//         {...getMenuProps()}
//         style={{
//           position: 'absolute',
//           backgroundColor: 'white',
//           width: '100%',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           listStyle: 'none',
//           padding: 0,
//           margin: 0,
//           zIndex: 1000,
//         }}
//       >
//         {isOpen &&
//           filteredGames.map((game, index) => (
//             <li
//               {...getItemProps({ item: game, index })}
//               key={game.AppID}
//               style={{
//                 padding: '0.5rem',
//                 backgroundColor:
//                   highlightedIndex === index ? '#f0f0f0' : 'white',
//               }}
//             >
//               {game.Name}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default GameSearch;
