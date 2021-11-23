// change path based on env 
// DefinePlugin to set variables in the webpack.config.js
declare const DEVELOPMENT: boolean;
declare const BASE_PATH: string;

export const base_path = DEVELOPMENT ? BASE_PATH : "";
