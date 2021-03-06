import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const ViewportContext = createContext({ width: 0, height: 0 });

type Props = {
  children?: ReactNode
};

const ViewportProvider = ({ children }: Props): ReactElement => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportProvider;

export const useViewport = (): Viewport => {
  const { width, height } = useContext(ViewportContext);
  return { width, height };
};

export interface Viewport {
  height: number;
  width: number;
}
