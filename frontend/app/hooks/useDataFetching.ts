import { useState, useEffect } from "react";

type UseDataFetchingParams<ApiType, ComponentType> = {
  url: string;
  dataPath: string;
  transform: (item: ApiType, index: number) => ComponentType;
  fallbackData: ComponentType[];
};

export const useDataFetching = <ApiType, ComponentType>({
  url,
  dataPath,
  transform,
  fallbackData,
}: UseDataFetchingParams<ApiType, ComponentType>) => {
  const [data, setData] = useState<ComponentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok && json[dataPath] && Array.isArray(json[dataPath])) {
          const transformedData = (json[dataPath] as ApiType[]).map(
            (item, index) => transform(item, index)
          );
          setData(transformedData);
        } else {
          console.error(
            `Failed to fetch data from ${url} or path '${dataPath}' not found. Using fallback data.`
          );
          setData(fallbackData);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We want this to run only once on mount.

  return { data, setData, loading };
};
