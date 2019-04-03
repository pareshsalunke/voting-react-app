
import Choice from "./containers/QuestionDetail";

/**
 * Return percent vates based on number of votes on particular choice and total number of votes
 * @param votes
 * @param totalVotes
 */
export const calculatePercent= (votes, totalVotes) =>{
  const percentValue =  isNaN( Number(parseInt(((parseInt(votes, 10) * 100) / totalVotes), 10).toFixed(4)) )? 0 : ((parseInt(votes,10) * 100)/ totalVotes).toFixed(4);
  return percentValue;
};

/**
 * Return total number of votes casted on a question
 * @param choices
 */
export const totalVotes= (choices: Choice[]) =>{
  let sum=0;
  for (let i=0; i < choices.length; i++){
    sum += choices[i].votes;
  }
  return sum;
};

/**
 * Given a string split the parameter and return the value of  choices
 * @param {string} url - string contain the question and choice
 * @return {string} arrayOfStrings[4] - return the value for choices
 */
export const choiceNumber= (url: string) =>{
  let arrayOfStrings = url.split('/');
  return arrayOfStrings[4];
};

/**
 * Return all the entered choices as a string
 * @param choices
 */
export const buildChoices= (choices) =>{
  let arrayOfStrings = choices.split(',');
  return JSON.stringify(arrayOfStrings);
};