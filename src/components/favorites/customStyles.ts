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
  typographyInEmpty: {
    fontSize: 22,
    marginTop: 7,
    marginBottom: 3,
    color: '#44003e',
  },
  buttonForSearch: {
    color: '#44003e',
    background: 'linear-gradient(45deg, #f9d4ff 30%, #ffe7c4 90%)',
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: 'capitalize',
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
  },
};

export default customStyles;
