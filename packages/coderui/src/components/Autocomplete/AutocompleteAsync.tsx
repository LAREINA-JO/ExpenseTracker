import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import type { AutocompleteSyncProps } from './AutocompleteSync';
import AutocompleteSync from './AutocompleteSync';

type Option = {
  value: string;
  label: string;
};

export type AutocompleteAsyncProps = Omit<AutocompleteSyncProps, 'options'> & {
  async: true;
  onFetchOption: (searchValue: string) => Promise<Option[]>;
  onError?: (error: any) => void;
};

const AutocompleteAsync: React.FC<AutocompleteAsyncProps> = ({
  className,
  onFetchOption,
  onError,
  customRenderNoOption,
  onInputChange,
  ...restProps
}: AutocompleteAsyncProps) => {
  const [searchLabel, setSearchLabel] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const option = await onFetchOption(searchLabel);
        setOptions(option);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchLabel, onFetchOption]);

  const handleInputChange = useCallback(
    (value: string) => {
      setSearchLabel(value);
      onInputChange?.(value);
    },
    [onInputChange],
  );

  const renderNoOptions = useCallback(() => {
    if (customRenderNoOption) {
      return customRenderNoOption();
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-between">
          <span>Loading...</span>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      );
    }
    return 'No options';
  }, [isLoading, customRenderNoOption]);

  return (
    <AutocompleteSync
      {...restProps}
      className={className}
      options={options}
      onInputChange={handleInputChange}
      customRenderNoOption={renderNoOptions}
    />
  );
};

export default AutocompleteAsync;
