import { configure } from "enzyme";
// configures Adapter to work with react 16
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
