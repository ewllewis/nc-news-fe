import { useState, useEffect } from "react";

function useVotes(initialVotes = 0, id, apiFunc) {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(0);

  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  const vote = (increment) => {
    if (hasVoted === increment) return;

    setIsVoting(true);
    setVotes((currVotes) => currVotes + increment);
    setHasVoted(increment);

    apiFunc(id, increment)
      .catch(() => {
        setVotes((currVotes) => currVotes - increment);
        setHasVoted(0);
        alert("Vote failed, please try again.");
      })
      .finally(() => {
        setIsVoting(false);
      });
  };

  return { votes, vote, isVoting, hasVoted };
}

export default useVotes;
