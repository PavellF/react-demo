import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from "enzyme";
import React from 'react';
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe("<BurgerBuilder/>", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onFetchIngredients={() => void 0}/>);
    });

    it("should render <BuildControls/> if has this.props.igredients not null", () => {
        wrapper.setProps({igredients: []});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});