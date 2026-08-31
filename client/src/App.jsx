/* Signal Desk redesign: polished dark workspace with expressive depth and motion. */
import { Toaster } from "sonner";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";

function Router(){return <Switch><Route path="/" component={Home}/><Route path="/login" component={()=><Home initialView="login"/>}/><Route path="/dashboard" component={()=><Home initialView="dashboard"/>}/><Route path="/library" component={()=><Home initialView="library"/>}/><Route path="/review" component={()=><Home initialView="review"/>}/><Route component={Home}/></Switch>}

export default function App() {
  return <><Toaster position="bottom-right" /><Router /></>;
}
