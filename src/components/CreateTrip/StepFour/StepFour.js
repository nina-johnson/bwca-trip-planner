import React, {Component} from 'react';
import { connect } from 'react-redux';
import NextButton from '../NextButton';

// Material
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';


class StepFour extends Component {

    state = {
        mealStatus: '',
    }

    componentDidMount() {
        this.props.dispatch( {type: 'GET_MEAL_LIST'} );
    }

    handleChange = (event) => {
        this.setState({
            mealStatus: event.target.value,
        })

        console.log( `in handleChange...`, this.state );
    }

    render() {
        const stepAction = {type: 'SET_MEALPLAN', payload: this.state};
        let mealPlan;
        // OR should this be in a ternary and/or conditionally rendered components?
        if( this.state.mealStatus === 'Pack my own' ){
            mealPlan = <p>This will be the meal-planning table!</p>;
        } else if( this.state.mealStatus === 'Get outfitted' ){
            mealPlan = <p>Here are some outfitters you could connect with!</p>;
        }
        // const breakfastList = this.props.reduxState.mealList;

        return(
            <div>

                <form>
                    <InputLabel>Would you like to pack your own meals or find an outfitter to pack them?</InputLabel>
                    <Select value={this.state.mealStatus}
                            onChange={this.handleChange} >
                        <MenuItem value="Pack my own" >Pack my own</MenuItem>
                        <MenuItem value="Get outfitted" >Get outfitted</MenuItem>
                    </Select>
                </form>
                
                {mealPlan}


                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Day</TableCell>
                                <TableCell>Breakfast</TableCell>
                                <TableCell>Lunch</TableCell>
                                <TableCell>Dinner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    <FormControl>
                                        <Select onChange={this.handleChange}>
                                            {this.props.reduxState.mealList.map( meal =>
                                                <MenuItem key={meal.code} value={meal.name} >{meal.name}</MenuItem>
                                                )}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>

                <NextButton action={stepAction} />
            </div>
        );
    } 
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect( mapReduxStateToProps )(StepFour);