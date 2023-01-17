const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))

let Movies = {
    myFavoriteMovies: [
        { name: "Gladiator", rating: "5/5" },
        { name: "Revenant", rating: "5/5" },
        { name: "Mission impossible", rating: "5/5" },
        { name: "Lord of the rings", rating: "5/5" },
        { name: "Harry potter", rating: "5/5" },
        { name: "Titanic", rating: "5/5" },
        { name: "Mouline rouge", rating: "5/5" },
        { name: "Superman", rating: "5/5" },
        { name: "Batman", rating: "5/5" }
    ]
}



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/movies", (req, res) => {
    res.send(Movies)
})

app.get("/addMovie.html", (req, res) => {
    res.sendFile(__dirname + "/addMovie.html")
})
app.get("/deleteMovie.html", (req, res) => {
    res.sendFile(__dirname + "/deleteMovie.html")
})

//Show movies
app.post("/", (req, res) => {

    // res.send(`<h1>Your result is ${Movies.myFavoriteMovies.flatMap(name => {
    //     return `<h3> Name ${name.name} Rating ${name.rating} </h3>`
    // })}</h1>`)
    res.send(Movies.myFavoriteMovies)
})


//Add movie
app.post("/addMovie", (req, res) => {
    let movieName = req.body.movieName + ""
    let movie = { name: movieName.toLocaleLowerCase(), rating: "5/5" }
    if (Movies.myFavoriteMovies.find(movies => movies.name.toLowerCase() == movie.name)) {

        res.write("Movie is already added")
    } else {
        Movies.myFavoriteMovies.push({ name: movieName, rating: "5/5" })
        res.write(`${movieName} was added to the list`)
    }
    res.send()
})

//Delete movie
app.post("/deleteMovie", (req, res) => {
    let movieName = req.body.movieName + ""
    let movie = { name: movieName, rating: "5/5" }
    console.log(movie.name)
    if (Movies.myFavoriteMovies.find(movies => movies.name.toLowerCase() == movie.name.toLowerCase())) {
        let movieIndex = Movies.myFavoriteMovies.findIndex(m => m.name.toLowerCase() == movie.name.toLowerCase())
        Movies.myFavoriteMovies.splice(movieIndex, 1)
        res.write(`${movie.name.toUpperCase()} was deleted from the list`)
    } else {
        res.write(`${movie.name.toUpperCase()} Is not in the list`)
    }
    res.send()
})


app.listen(PORT, () => {
    console.log("listening to port " + PORT)
    console.log(Movies)
})