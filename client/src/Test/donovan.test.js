import {render, screen, fireEvent} from '@testing-library/react';
import CreateSoundBiteButton from '../components/CreateSoundBiteButton'
import SaveSoundBiteButton from '../components/SaveSoundBiteButton'
import GenerateSoundBiteButton from '../components/GenerateSoundBiteButton'
import SoundBiteOutputs from '../components/SoundBiteOutputs'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import '@testing-library/jest-dom'

configure({adapter: new Adapter()});
describe('Create sound bite, function will show the form', () => {
        let mockCallBack;
           function renderComponent() {
            mockCallBack = jest.fn().mockName('mockCallBack')
         
             render(
                <CreateSoundBiteButton variant="contained" onClick={mockCallBack}/>,
             );

             return((<CreateSoundBiteButton variant="contained" onClick={mockCallBack}/>))
           }
        
    it('Create Soundbite Button calls onClick Function', () => {
        const button = shallow(renderComponent());
        button.find('WithStyles(ForwardRef(Button))').simulate('click')
        expect(mockCallBack).toHaveBeenCalled();
    })}),
    describe('Savesound bite, function will show the form', () => {
      let mockCallBack;
         function renderComponent() {
          mockCallBack = jest.fn().mockName('mockCallBack')
       
           render(
              <SaveSoundBiteButton variant="contained" onClick={mockCallBack}/>,
           );

           return((<SaveSoundBiteButton variant="contained" onClick={mockCallBack}/>))
         }
      
  it('Save Soundbite Button calls onClick Function', () => {
      const button = shallow(renderComponent());
      button.find('WithStyles(ForwardRef(Button))').simulate('click')
      expect(mockCallBack).toHaveBeenCalled();
  })}),

  describe('SoundBiteOutputs', () => {
    let mockCallBack;
       function renderComponent() {
         render(
            <SoundBiteOutputs variant="contained" onChange={mockCallBack}/>,
         );

         return((<SoundBiteOutputs variant="contained" onChange={mockCallBack}/>))
       }

       it('Has Submitted Transcript', () => {
         renderComponent();
         expect(screen.getByText('Submitted Transcript:')).toBeInTheDocument();
     })
})
    

