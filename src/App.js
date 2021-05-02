import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import EditCategorie from "./pages/EditCategorie";
import CreateCategorie from "./pages/CreateCategorie";
import Categories from "./pages/Categories";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/articles/:id/edit" component={EditArticle} />
              <Route path="/articles/create" component={CreateArticle} />
              <Route path="/articles/:id" component={Article} />
              <Route path="/articles" component={Articles} />
              <Route path="/categories/:id/edit" component={EditCategorie} />
              <Route path="/categories/create" component={CreateCategorie} />
              <Route path="/categories" component={Categories} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/profile/edit" component={EditProfile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
