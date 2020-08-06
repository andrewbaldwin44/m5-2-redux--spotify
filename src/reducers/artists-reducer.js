const initialState = {
  currentArtist: null,
  topTracks: null,
  status: "idle",
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_ARTIST_INFO': {
      return {
        ...state,
        status: 'loading',
      }
    }

    case 'RECEIVE_ARTIST_PROFILE': {
      return {
        ...state,
        currentArtist: action.profile,
      }
    }

    case 'RECEIVE_TOP_TRACKS': {
      return {
        ...state,
        topTracks: action.tracks,
      }
    }

    case 'RECEIVE_ALL_ARTIST_INFO': {
      return {
        ...state,
        status: 'idle',
      }
    }

    case 'RECEIVE_ARTIST_INFO_ERROR': {
      return {
        ...state,
        status: 'error'
      }
    }

    default: {
      return state;
    }
  }
}
