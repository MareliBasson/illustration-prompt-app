import React, { Component } from 'react'
import { firebase } from 'firebaseConfig'
import _ from 'lodash'

import styled, { css } from 'styled-components'
import { tokens } from 'styles/variables'

import PromptCreate from './prompt-create'
import PromptUpdate from './prompt-update'

export class SettingsPrompts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			prompts: [],
			categories: [],
			editedList: [],
			newPromptName: '',
			newCategories: '',
			selectedPrompt: {},
			showCreateForm: false,
			showCreateBtn: true,
		}

		this.onDelete = this.onDelete.bind(this)
		this.selectPrompt = this.selectPrompt.bind(this)
		this.closeForm = this.closeForm.bind(this)
		this.openCreateForm = this.openCreateForm.bind(this)
	}

	componentDidMount() {
		const db = firebase.firestore()
		db.collection('prompts').onSnapshot((snapshot) => {
			const promptsData = []
			snapshot.forEach((doc) => promptsData.push({ ...doc.data(), id: doc.id }))

			this.setState({
				prompts: promptsData,
				editedList: _.sortBy(promptsData, ['category', 'description']),
			})
		})

		db.collection('categories').onSnapshot((snapshot) => {
			const categoriesData = []
			snapshot.forEach((doc) => categoriesData.push(doc.data()))

			this.setState({
				categories: _.sortBy(categoriesData, 'name'),
			})
		})
	}

	onDelete(e, promptId) {
		e.stopPropagation()
		if (window.confirm('Are you sure you want to delete this prompt?')) {
			const db = firebase.firestore()
			db.collection('prompts').doc(promptId).delete()
		}
	}

	selectPrompt(prompt) {
		const { selectedPrompt } = this.state

		if (_.isEmpty(selectedPrompt) || !_.isEqual(prompt, selectedPrompt)) {
			this.setState({
				selectedPrompt: prompt,
				showCreateBtn: false,
				showCreateForm: false,
			})
		}
	}

	closeForm() {
		this.setState({
			selectedPrompt: {},
			showCreateForm: false,
			showCreateBtn: true,
		})
	}

	openCreateForm() {
		this.setState({
			showCreateForm: true,
			showCreateBtn: false,
		})
	}

	handleSort(prop) {
		this.setState({
			editedList: _.sortBy(this.state.editedList, prop),
		})
	}

	handleFilter(e) {
		this.setState({
			editedList:
				e.target.value === 'all' ? this.state.prompts : _.filter(this.state.prompts, ['category', e.target.value]),
		})
	}

	render() {
		const { editedList, categories, selectedPrompt, showCreateForm, showCreateBtn } = this.state

		return (
			<>
				<PromptList className="prompt-list">
					<div className="column left">
						<PromptFilters className="prompt-filters">
							<div className="filter-section filtering">
								Filter by category:{' '}
								<div className="select-wrapper">
									<select name="" id="" onChange={(e) => this.handleFilter(e)}>
										<option value="all">All Prompts</option>
										{categories.map((category) => (
											<option key={category.name} value={category.name}>
												{category.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="filter-section sorting">
								Sort by:
								<div
									className="btn btn-primary btn-in-form"
									onClick={() => this.handleSort('description')}
								>
									Description
								</div>
								<div
									className="btn btn-primary btn-in-form"
									onClick={() => this.handleSort(['category', 'description'])}
								>
									Category
								</div>
							</div>
						</PromptFilters>
						{editedList.map((prompt) => (
							<Prompt
								key={prompt.id}
								// className={`prompt ${_.isEqual(prompt, selectedPrompt) ? 'selected' : ''}`}
								onClick={() => {
									this.selectPrompt(prompt)
								}}
								$selected={_.isEqual(prompt, selectedPrompt)}
							>
								<div className="description">{prompt.description}</div>
								{/* <div className="image">{prompt.imageUrl && <i className="fa fa-file-image-o"></i>}</div> */}
								<div className="category">{prompt.category}</div>
								{/* <div className="options">
									<button
										onClick={(e) => {
											this.onDelete(e, prompt.id)
										}}
										className="btn btn-icon "
									>
										<i className="fa fa-trash"></i>
									</button>
								</div> */}
							</Prompt>
						))}
					</div>
					<div className="column right">
						<PromptActions className="prompt-actions">
							{showCreateBtn && (
								<CreatePromptButton
									onClick={() => {
										this.openCreateForm()
									}}
									className="btn-create-prompt"
								>
									<i className="fa fa-plus"></i>
									<h3>Create Prompt</h3>
								</CreatePromptButton>
							)}

							{showCreateForm && <PromptCreate closeForm={this.closeForm} />}

							{!_.isEmpty(selectedPrompt) && (
								<PromptUpdate prompt={selectedPrompt} closeForm={this.closeForm} />
							)}
						</PromptActions>
					</div>
				</PromptList>
			</>
		)
	}
}

const PromptFilters = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }

  .btn,
  .select-wrapper {
    margin-left: 10px;
  }
`
const PromptList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
`
const Prompt = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 50px;
    padding: 10px 10px;
    cursor: pointer;

    .category {
      text-align: right;
    }

    .options {
      opacity: 0;
      text-align: right;

      @media (max-width: 768px) {
        opacity: 1;
      }
    }

	${(props) => props.$selected && css`
      background-color: rgba(${tokens.colorGreen}, 0.3);

      .options {
        opacity: 1;
      }
	`}

    &:hover {
      background-color: rgba(${tokens.colorGreen}, 0.3);

      .options {
        opacity: 1;
      }
    }
`
const PromptActions = styled.div`
    position: sticky;
    top: 20px;
`
const CreatePromptButton = styled.div`border: 2px solid ${tokens.colorGreen};
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-align: center;
      height: 150px;
      box-sizing: border-box;
      margin-bottom: 20px;

      i {
        margin-bottom: 10px;
        font-size: 40px;
      }

      &:hover {
        background-color: rgba(${tokens.colorGreen}, 0.3);
      }

      @media (max-width: 768px) {
        flex-direction: row;
        height: auto;
        padding: 10px;

        h3 {
          line-height: 1.3em;
        }
        i {
          margin: 0px 10px 0px 0px;
          font-size: 20px;
        }
      }
`

// .prompt-list {

//   .prompt {
//   }

//   .prompt-actions {

//     .btn-create-prompt {
      
//     }
//   }
// }
