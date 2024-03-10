const customStyles = {
  box: {
    width: '100%',
  },
  loader: {
    color: '#44003e',
  },
  card: {
    width: 150,
    height: 230,
    position: 'relative',
    margin: 2,
  },
  typography: {
    color: '#44003e',
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  iconButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 1,
    color: '#C41E3A',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  cardMedia: {
    width: '100%',
    height: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

export default customStyles;
