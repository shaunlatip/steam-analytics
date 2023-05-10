// pages/api/games.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { Game, GameResponse } from '../../types';
import Papa, { ParseError } from 'papaparse';

function isValidGame(game: Game): boolean {
  return (
    typeof game.AppID === 'number' &&
    typeof game.Name === 'string' &&
    typeof game.Cluster === 'number'
  );
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[]>
) {
  const filePath = './clustering_data/df_50_clusters.csv';
  console.log('Reading CSV file:', filePath);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, errors } = await new Promise<Papa.ParseResult<Game>>((resolve, reject) => {
      Papa.parse<Game>(fileContent, {
        header: true,
        complete: (results) => resolve(results),
        error: (error: any) => reject(error),
        dynamicTyping: true,
      });
    });

    console.log('Parse errors:', errors);

    console.log("data:")
    console.log(data)

    // Filter out any invalid game data
    const validGames = data.filter(isValidGame);
    console.log("validGames:")
    console.log(validGames)

    res.status(200).json(validGames);
  } catch (error) {
    console.error('Error reading the CSV file:', error);
  }
}
