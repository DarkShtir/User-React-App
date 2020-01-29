import React, { useRef } from 'react';
import './CreateForm.module.scss';
import Input from '../UI/Input/Input';

// interface Props{
//   onAdd(title:string):void
// }

export const CreateForm: React.FC = () => {
	// const ref = useRef<HTMLInputElement>(null);
	// const addHandler = (event: React.KeyboardEvent) => {
	//   if (event.key === 'Enter') {
	//     props.onAdd(ref.current!.value);
	//     ref.current!.value = '';
	//     // console.log(title);
	//     // setTitle('');
	//   }
	// };

	return (
		<div className="row center-align container">
			<h2>Create User</h2>
			<form className="col s12 ">
				<Input value={' '} label={'Login'} />
				<Input value={' '} label={'Password'} type={'password'} />
				<Input value={' '} label={'First Name'} />
				<Input value={' '} label={'Last Name'} />
				<Input value={' '} label={'Nationality'} />
				<Input value={' '} label={'Phone'} type={'tel'} />

				<label>Gender Select</label>
				<select className="browser-default s6">
					<option value="" disabled>
						Choose your gender
					</option>
					<option value="1">Male</option>
					<option value="2">Female</option>
				</select>
			</form>
			<button
				// onClick={addHandler}
				className="btn-floating btn-large waves-effect waves-light yellow darken-4 center"
			>
				Add
			</button>
		</div>
	);
};
