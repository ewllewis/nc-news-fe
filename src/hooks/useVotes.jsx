import { useState, useEffect } from "react";

function useVotes(initialVotes, id, apiFunc) {
  const [votes, setVotes] = useState(initialVotes || 0);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  const vote = (increment) => {
    if (hasVoted) return;

    setIsVoting(true);
    setVotes((currVotes) => currVotes + increment);
    setHasVoted(true);

    apiFunc(id, increment)
      .catch(() => {
        setVotes((currVotes) => currVotes - increment);
        setHasVoted(false);
        alert("Vote failed, please try again.");
      })
      .finally(() => {
        setIsVoting(false);
      });
  };

  return { votes, vote, isVoting, hasVoted };
}

export default useVotes;
