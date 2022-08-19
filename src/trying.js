import React from "react"
import axios from 'axios'
export class JokeList2 extends React.Component {
    constructor(props){
        super(props)
        this.state = {jokes: []}
        this.numJokesToGet = 10
        // this.generateNewJokes = this.generateNewJokes.bind(this);
        // this.resetVotes = this.resetVotes.bind(this);
        // this.toggleLock = this.toggleLock.bind(this);
        this.vote = this.vote.bind(this);
    }

    componentDidMount() {
        if (this.state.jokes.length < this.numJokesToGet) this.getJokes();
      }


    async getJokes(){
        console.log(7)
        while(this.state.jokes.length < this.numJokesToGet){
            let data = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
              });
            this.state.jokes.push(data.data.joke)

            //setState breaks loop
            // console.log('77')
            // this.setState({
            //     jokes: this.state.jokes.push('88')
            // })
        }
        console.log(this.state.jokes)
        this.setState({ jokes: this.state.jokes });
    }

    vote(id, delta){
        this.setState(jk => ({
            
            jokes: jk.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
        }));
        
    }

    // function vote(id, delta) {
    //     setJokes(allJokes =>
    //       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    //     );
    //   }

    render(){
        return (
            <div>
                fat man 
            </div>
        )
    }
}