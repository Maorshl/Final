//* This file contains all the style property, for Materiel UI.
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  rootPostDisplay: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 0,
  },
  postsPostDisplay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "fit-content",
  },
  spinnerPostDisplay: {
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginTop: "3rem",
    margin: "auto",
  },
  inputContainer: {
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
  },
  descriptionContainer: {
    width: "600px",
  },
  rootAppBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleAppBar: {
    flexGrow: 1,
  },
  listDrewer: {
    width: 250,
  },
  menuButtonDrewer: {
    color: "white",
    marginRight: "1rem",
  },
  fullListDrewer: {
    width: "auto",
  },
  rootFloating: {
    marginBottom: "1rem",
    marginLeft: "1rem",
    position: "fixed",
    bottom: 0,
    zIndex: 9000,
  },
  extendedIconFloating: {
    marginRight: theme.spacing(1),
  },
  rootPostCard: {
    width: "50%",
    margin: "auto",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.35)",
    marginTop: "1rem",
    background: "rgb(159,168,218)",
    background:
      "linear-gradient(45deg, rgba(159,168,218,1) 0%, rgba(111,125,200,1) 100%)",
  },
  avatarPostCard: {
    backgroundColor: red[500],
  },
  rootSignIn: {
    height: "100vh",
  },
  imageSingIn: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paperSingIn: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatarSingIn: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formSingIn: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "white",
  },
  submitSingIn: {
    margin: theme.spacing(3, 0, 2),
  },
  rightSingIn: {
    backgroundColor: "#333",
    color: "white",
  },
  paperSignUp: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatarSignUp: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formSignUp: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submitSignUp: {
    margin: theme.spacing(3, 0, 2),
  },
  rootTags: {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    margin: 0,
  },
  chipTags: {
    margin: theme.spacing(0.5),
  },
  cardActions: {
    justifyContent: "space-around",
  },
  addPost: {
    width: "90rem",
    height: "46rem",
    margin: "auto",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.35)",
    marginTop: "2rem",
    background: "rgb(159,168,218)",
    background:
      "linear-gradient(45deg, rgba(159,168,218,1) 0%, rgba(111,125,200,1) 100%)",
  },
  headers: {
    background: "rgb(159,168,218)",
    background:
      "linear-gradient(45deg, rgba(159,168,218,1) 0%, rgba(111,125,200,1) 100%)",
  },
  noMorePosts: {
    width: "50%",
    margin: "auto",
    marginTop: "1rem",
    background: "rgb(159,168,218)",
    background:
      "linear-gradient(45deg, rgba(159,168,218,1) 0%, rgba(111,125,200,1) 100%)",
  },
}));

export default useStyles;
