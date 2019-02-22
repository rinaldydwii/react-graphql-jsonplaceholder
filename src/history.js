import createHistory from "history/createBrowserHistory"

const history = createHistory()

export const redirect = (to) => {
    history.push(to);
    history.go()
}

export default history