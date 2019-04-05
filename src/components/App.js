import React, {Component} from 'react';

//CSS modules
import {Slider, InputNumber, Row, Col, Icon, 
	Modal, Button, Spin, Card, Divider} from 'antd';
import 'antd/dist/antd.css'
import '../index.css';

export default class App extends Component {

	constructor()
	{
		super();
		this.state = { 
			loanAmount:500,
			noOfMonths:6,
			interestRate:0,
			monthlyPayment:0,
			buttonClicked:false,
		};
		this.onAmountChange = this.onAmountChange.bind(this);
		this.onMonthChange = this.onMonthChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderInterestRate = this.renderInterestRate.bind(this);
		this.renderMonthlyPayment = this.renderMonthlyPayment.bind(this);
	}

	onAmountChange (value) {
		this.setState({loanAmount:value})
	}

	onMonthChange (value) {
		this.setState({noOfMonths: value})
	}

	handleSubmit () {
		this.setState({buttonClicked: true, interestRate: 0, monthlyPayment: 0})
		let amount = this.state.loanAmount;
		let months = this.state.noOfMonths;
		fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${months}`)
		.then(res => res.json())
		.then (
			(result) => {
				this.setState ({ interestRate: result.interestRate,
								monthlyPayment: result.monthlyPayment.amount,
								});
			},
			(error) => {
				this.setState ({data: error});
			}
			)
	}

	renderInterestRate () {
		let interest = this.state.interestRate
		if(!this.state.interestRate && this.state.buttonClicked === true) {
			return (<Spin size="large"/> );
		} else if (!this.state.interestRate && this.state.buttonClicked === false) {
			return (<h3>0</h3>);
		} else if (this.state.interestRate && this.state.monthlyPayment) {
			return (<h3>{interest}</h3>);
		}
	}

	renderMonthlyPayment () {
		let monthlyPayment = this.state.monthlyPayment
		if(!this.state.monthlyPayment && this.state.buttonClicked === true) {
			return (<Spin size="large" style={{color: '#2b7a78'}}/> );
		} else if (!this.state.monthlyPayment && this.state.buttonClicked === false) {
			return (<h3>0</h3>);
		} else if (this.state.interestRate && this.state.monthlyPayment) {
			return (<h3>{monthlyPayment}</h3>);
		}	
	}

	render() {
		const {loanAmount, noOfMonths, interestRate, monthlyPayment} = this.state;
		return (
				<div>
					<Row type="flex" justify="start">
							<h5>FULLTHROTTLE LABS</h5>
					</Row>
					<div style={{paddingLeft: '100px', paddingTop: '120px'}}>
						<Row gutter={18} justify="space-around">
							<Col span={12} style={{backgroundColor: '#2b7a78'}}>
								<Card style={{backgroundColor: '#17252a'}} bordered={false}>
									<Row type="flex" justify="start">
										<Col span={12}>
											<h5>Select the loan amount</h5>
										</Col>
									</Row>
									<Row type="flex" justify="start">
										<Col span={20}>
								          <Slider
								            min={500}
								            max={2500}
								            onChange={this.onAmountChange}
								            value={typeof loanAmount === 'number' ? loanAmount : 0}
								            step={10}
								          />
								        </Col>
								    </Row>
								    <Row type="flex" justify="start">
								    	<Col span={18}>
								    	<h5>500</h5>
								    	</Col>
								    	<Col span={4}>
								    	<h5>2500</h5>
								    	</Col>
								    </Row>
								    <Row type="flex" justify="start">
								    	<Col span={1}>
								    		<h5>$</h5>
								    	</Col>
								    	<Col span={6}>
								    		<InputNumber
								    			min={500}
								    			max={2500}
								    			value={loanAmount}
								    			onChange={this.onAmountChange}/>
								    	</Col>
								    </Row>
								    <br/>
								    <Row type="flex" justify="start">
										<Col span={12}>
											<h5>Select the number of months</h5>
										</Col>
									</Row>
									<Row type="flex" justify="start">
										<Col span={20}>
								          <Slider
								            min={6}
								            max={24}
								            onChange={this.onMonthChange}
								            value={typeof noOfMonths === 'number' ? noOfMonths : 0}
								            step={1}
								          />
								        </Col>
								    </Row>
								    <Row type="flex" justify="start">
								    	<Col span={19}>
								    	<h5>6</h5>
								    	</Col>
								    	<Col span={4}>
								    	<h5>24</h5>
								    	</Col>
								    </Row>
								    <Row type="flex" justify="start">
								    	<Col span={5}>
								    		<InputNumber
								    			min={6}
								    			max={24}
								    			value={noOfMonths}
								    			onChange={this.onMonthChange}/>
								    	</Col>
								    	<Col span={4}>
								    		<h5>months</h5>
								    	</Col>
								    </Row>
							        <br/>
							        <Row type="flex" justify="start">
							        <Button type="primary" className="button-class" onClick={this.handleSubmit}>Find</Button>
							        </Row>
							    </Card>
							</Col>
							<Col span={12}>
								<Card style={{backgroundColor: '#17252a'}} bordered={false}>
									<Row type="flex" justify="start">
										<Col span={12}>
											<h3>Interest Rate</h3>
										</Col>
									</Row>
									<Row type="flex" justify="start">
										<Col span={12}>
											{this.renderInterestRate()}
										</Col>
									</Row>
									<Row type="flex" justify="start">
										<Col span={12}>
											<h3>Monthly Payments</h3>
										</Col>
									</Row>
									<Row type="flex" justify="start">
										<Col span={12}>
											{this.renderMonthlyPayment()}
										</Col>
									</Row>
							    </Card>
							</Col>
				        </Row>
					</div>
				</div>
			)
	}
}