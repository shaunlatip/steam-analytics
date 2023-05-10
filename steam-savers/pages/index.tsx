"use client"; // this is a client component

import Image from 'next/image'
import styles from '../styles/page.module.css'
import { Select, Input, Button } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import Papa, { ParseResult } from 'papaparse';
import { useRef } from "react";
import GameSearch from '../components/GameSearch';

import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import { Game } from '../types';
import theme from '../theme';


const Home: NextPage = () => {


  const [numClusters, setNumClusters] = useState(4);
  const [dimensions, setDimensions] = useState(3);

  const [games, setGames] = useState<Game[]>([]);
  const [searchResult, setSearchResult] = useState<Game | null>(null);

  async function fetchGamesData(currNumClusters: number) {
    try {
      let path = '/api/4_clusters'
      switch (currNumClusters) {
        case 4:
          path = '/api/4_clusters'
          break;
        case 6:
          path = '/api/6_clusters'
          break;
        case 10:
          path = '/api/10_clusters'
          break;
        case 50:
          path = '/api/50_clusters'
          break;
        case 296:
          path = '/api/296_clusters'
          break;
      }
      const response = await fetch(path);
      console.log('API response:', response);

      const data: Game[] = await response.json();
      console.log(data)
      setGames(data);
    } catch (error) {
      console.error('Error fetching games data:', error);
    }
  }

  useEffect(() => {
    fetchGamesData(numClusters);
  }, []);

  const handleOptionChange = (event:any) => {
    const selectedValue = event.target.value;
    console.log('Selected value:', selectedValue);
  
    if (selectedValue === 'option1') {
      setNumClusters(4);
      fetchGamesData(4);
    } else if (selectedValue === 'option2') {
      setNumClusters(6);
      fetchGamesData(6);
    } else if (selectedValue === 'option3') {
      setNumClusters(10);
      fetchGamesData(10);
    } else if (selectedValue === 'option4'){
      setNumClusters(50);
      fetchGamesData(50);
    } else if (selectedValue === 'option5'){
      setNumClusters(296);
      fetchGamesData(296);
    } else if (selectedValue === '1dimension') {
      setDimensions(1)
    } else if (selectedValue === '2dimension') {
      setDimensions(2)
    } else if (selectedValue === '3dimension') {
      setDimensions(3)
    }
  };

  // function readCSVFile(filePath: string, callback: (error: Error | null, data: Game[] | null) => void): void {
  //   fs.readFile(filePath, 'utf8', (error, data) => {
  //     if (error) {
  //       callback(error, null);
  //       return;
  //     }
  
  //     Papa.parse<Game>(data, {
  //       header: true,
  //       complete: (results: ParseResult<Game>) => {
  //         callback(null, results.data);
  //       },
  //       error: (error: any) => {
  //         callback(error, null);
  //       },
  //     });
  //   });
  // }
  
  

  // const handleClick = (event:any) =>{
  //   const filepath = '/pca_output/df_4_clusters.csv'
  //   readCSVFile(filepath, (error, data) => {
  //     if (error) {
  //       console.error('Error reading CSV file:', error);
  //       return;
  //     }
    
  //     console.log('CSV data:', data);
  //   });
  // }

  return (
    <ChakraProvider theme={theme}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1 style={{fontWeight: 600, fontSize: '4rem', color: 'white'}}>
            Steam Savers
          </h1>
          <p style={{color: 'white', marginBottom: '4rem'}}>
            By Juliana Han, Shaun Latip, Lyatte Liu, and Jayden Yi
          </p>
        </div>

        <div className={styles.section}>
          <div className={styles.card}>

          <h2 style={{fontSize: '2rem', fontWeight: '600', marginBottom: '1rem'}}>PCA Visualization for Hierarchical Clustering</h2>
          <div className={styles.row}>
            
            {/* clustering search  */}
            <div className={styles.panel}>

              <p style={{marginBottom: '1rem'}}>
                <span style={{fontWeight: 600}}>Instructions</span><br/>
                Double-click clusters on the right panel to isolate them. <br/><br/>
                Click clusters to toggle them from your selection; hold Shift and click to toggle multiple clusters.
              </p>


              <div className={styles.formInput}>
                <p>Number of clusters</p>
                <Select onChange={handleOptionChange} style={{width: '100%'}}>
                  <option value='option1'>4</option>
                  <option value='option2'>6</option>
                  <option value='option3'>10</option>
                  <option value='option4'>50</option>
                  <option value='option5'>296</option>
                </Select>
              </div>

              <div className={styles.formInput}>
                <p>Number of dimensions</p>
                <Select onChange={handleOptionChange}>
                  <option value='3dimension'>3</option>
                  <option value='2dimension'>2</option>
                  <option value='1dimension'>1</option>
                  
                  
                </Select>
              </div>
              
              <div className={styles.formInput}>
                <p>Search games</p>
                <GameSearch data={games} numClusters={numClusters} key={numClusters}/>
              </div>

            </div>


    {/* embedded scatter plot  */}
    <div className={styles.scatter_plot_div}>
      {getScatterPlot(numClusters, dimensions)}
    </div>



  </div>

  </div>
        </div>

        

      </main>
    </ChakraProvider>
  )
}



function getScatterPlot(numClusters: number, dimensions: number) {

  let path = `pca_plot_${numClusters}_clusters_${dimensions}_dimensions.html`
  
  return(
    <div style={{width: "100%", padding: "0 1rem"}}>
      <iframe className={styles.scatter_plot} src={path}></iframe>
    </div>
  )
  
}

export default Home;
