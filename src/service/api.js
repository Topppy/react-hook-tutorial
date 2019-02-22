const RANK = [
  {
    rank: 1,
    score: 1000,
  },
  {
    rank: 2,
    score: 950,
  },
  {
    rank: 3,
    score: 900,
  },
  {
    rank: 4,
    score: 800,
  },
  {
    rank: 5,
    score: 800,
  },
  {
    rank: 6,
    score: 700,
  },
  {
    rank: 7,
    score: 700,
  },
  {
    rank: 8,
    score: 600,
  },
  {
    rank: 9,
    score: 600,
  },
  {
    rank: 10,
    score: 500,
  },
  {
    rank: 11,
    score: 500,
  },
  {
    rank: 12,
    score: 400,
  },
  {
    rank: 13,
    score: 400,
  },
  {
    rank: 14,
    score: 300,
  },
  {
    rank: 15,
    score: 200,
  },
  {
    rank: 16,
    score: 100,
  },
  {
    rank: 17,
    score: 10,
  },
]

const api = {
  getRank(offset, pageSize) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          results: RANK.slice(offset, offset+pageSize),
          total: 17,
        })
      }, 50)
    })
  },
}

export default api