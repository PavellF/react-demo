import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from "enzyme";
import React from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems";

configure({adapter: new Adapter()});

describe("<NavigationItem/>", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it("should render two <NavigationItem/> elements if not authenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("should render three <NavigationItem/> elements if authenticated", () => {
        wrapper.setProps({
            isAuth: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("should contain logout link", () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link={"/logout"}>Logout</NavigationItem>)).toEqual(true);
    });
});