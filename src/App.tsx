import React, { FunctionComponent, useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Text,
  Button,
  extendTheme,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useClipboard,
  Tooltip,
  Grid,
  SimpleGrid
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaMoneyBillAlt,
} from "react-icons/fa";
import styled from "@emotion/styled";
import QRCode from "qrcode.react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

function Logo() {
  const fillColor = useColorModeValue("#000", "#fff");

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM25 3.57143C37.0089 3.57143 46.4286 12.9911 46.4286 25C46.4286 37.0089 37.0089 46.4286 25 46.4286C12.9911 46.4286 3.57143 37.0089 3.57143 25C3.57143 12.9911 12.9911 3.57143 25 3.57143ZM25 7.14286C17.0402 7.14286 10.7143 13.4688 10.7143 21.4286C10.7143 29.3884 17.0402 35.7143 25 35.7143C32.9598 35.7143 39.2857 29.3884 39.2857 21.4286C39.2857 13.4688 32.9598 7.14286 25 7.14286Z"
        fill={fillColor}
      />
    </svg>
  );
}

const GradientStyledText = styled.a<{
  color1: string;
  color2: string;
  color3: string;
}>`
  font-size: xs;
  font-weight: bold;
  background-image: linear-gradient(
    45deg,
    ${({ color1 }) => color1},
    ${({ color2 }) => color2},
    ${({ color3 }) => color3}
  );
  -webkit-background-clip: text;
  color: transparent;
  text-decoration: none;
`;

interface GradientTextProps {
  children: React.ReactNode;
  color1: string;
  color2: string;
  color3: string;
  href: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  color1,
  color2,
  color3,
  href,
}) => {
  return (
    <GradientStyledText
      color1={color1}
      color2={color2}
      color3={color3}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </GradientStyledText>
  );
};

type QRCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const walletAddress = "0xAd63B47467145aD4f8159B415978aeF29452a442";
  const { onCopy } = useClipboard(walletAddress);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleCopy = () => {
    onCopy();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <Tooltip
        label="Copied!"
        isOpen={showTooltip}
        bg="green.500"
        color="white"
        fontSize="md"
        placement="top"
      >
        <ModalContent borderRadius="xl" maxW="450px" onClick={handleCopy}>
          <Flex alignItems="center" flexDirection="column">
            <ModalHeader fontSize="22px" fontWeight="extrabold" mt="10">
              Help me to keep BUIDLing :)
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex alignItems="center" flexDirection="column">
                <QRCode
                  value={walletAddress}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"Q"}
                  includeMargin={true}
                  imageSettings={{
                    src: "https://docs.bnbchain.org/img/icon/favicon.ico",
                    x: undefined,
                    y: undefined,
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />
                <Text fontSize="xs" mt="5" mb="10">
                  Scan this BNBChain (BEP20) Wallet QR code or click to copy it!
                </Text>
              </Flex>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Tooltip>
    </Modal>
  );
};

function HeaderButtons() {
  const hoverBgColor = useColorModeValue("gray.300", "gray.600");
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)
  const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);

  const openQRCodeModal = () => {
    setQRCodeModalOpen(true);
  };

  const closeQRCodeModal = () => {
    setQRCodeModalOpen(false);
  };

  return (
    <>
      <HStack position="fixed" top="1rem" right="1rem" zIndex={10} spacing={2}>
        <Button
          as="a"
          onClick={openQRCodeModal}
          size="sm"
          leftIcon={<FaMoneyBillAlt />}
          style={{ cursor: "pointer" }}
          _hover={{ bgColor: hoverBgColor }}
        >
          Donate
        </Button>
        <IconButton
          aria-label="Toggle theme"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
          size="sm"
          _hover={{ bgColor: hoverBgColor }}
          isRound
        />
      </HStack>
      <QRCodeModal isOpen={isQRCodeModalOpen} onClose={closeQRCodeModal} />
    </>
  );
}

function isValidAddress(address: string): boolean {
  return address.startsWith("0x") && address.length === 42;
}

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  isLoading: boolean;
  onClear: () => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  onSearch,
  isLoading,
  onClear,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleClearSearch = () => {
    setSearchText("");
    onClear();
  };

  const isSearchButtonDisabled = !isValidAddress(searchText) || isLoading;

  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      spacing={4}
      width="100%"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Input BNBChain Wallet Address"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          width={{ base: "100%", md: "450px" }}
        />
        {searchText && (
          <InputRightElement>
            <IconButton
              aria-label="Clear"
              icon={<CloseIcon />}
              size="sm"
              onClick={handleClearSearch}
              variant="ghost"
            />
          </InputRightElement>
        )}
      </InputGroup>
      <Button
        onClick={handleSearch}
        colorScheme="blue"
        isLoading={isLoading}
        isDisabled={isSearchButtonDisabled}
      >
        Search
      </Button>
    </VStack>
  );
};

interface DataItem {
  hash: string;
  to: string;
  address: string;
  nameTag: string;
  reporter: string;
}

interface DataTableProps {
  data: DataItem[];
}

const DataTable: FunctionComponent<DataTableProps> = ({ data }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th textAlign="center">TxHash</Th>
          <Th textAlign="center">Token Approved</Th>
          <Th textAlign="center">Scam Contract</Th>
          <Th textAlign="center">Reporter</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.hash}>
            <Td fontSize="xs">
              <a
                href={`https://bscscan.com/tx/${item.hash}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline" }}
              >
                {item.hash}
              </a>
            </Td>
            <Td fontSize="xs">{item.to}</Td>
            <Td fontSize="xs">
              {item.address} ({item.nameTag})
            </Td>
            <Td fontSize="xs">{item.reporter}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

function Footer() {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverBgColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      as="footer"
      role="contentinfo"
      borderTopWidth="1px"
      borderTopColor={bgColor}
      bg={bgColor}
      p={4}
    >
      <VStack spacing={4} alignItems="center">
        <Text fontWeight="bold" fontSize="lg">
          BeSAFU! V1
        </Text>
        <VStack spacing={1} alignItems="center">
          <Text fontSize={{ base: "xs", md: "sm" }} textAlign="center">
            Discover if your BNBChain address interacted with any Scam Smart
            Contract.
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }} textAlign="center">
            Safeguard your Crypto Assets by using our Intelligent Analysis.
          </Text>
          <Text fontSize="xs" textAlign="center">
            Database update: 11-June-2023
          </Text>
        </VStack>
        <HStack spacing={4}>
          <Link href="https://github.com/J1Mtonic/BeSAFU" isExternal>
            <IconButton
              icon={<FaGithub />}
              aria-label="Github"
              color={iconColor}
              _hover={{ bgColor: hoverBgColor }}
            />
          </Link>
          <Link href="https://twitter.com/0xJ1M" isExternal>
            <IconButton
              icon={<FaTwitter />}
              aria-label="Twitter"
              color={iconColor}
              _hover={{ bgColor: hoverBgColor }}
            />
          </Link>
          <Link href="mailto:jaime@venusstars.io" isExternal>
            <IconButton
              icon={<FaEnvelope />}
              aria-label="Email"
              color={iconColor}
              _hover={{ bgColor: hoverBgColor }}
            />
          </Link>
        </HStack>
        <VStack spacing={2} alignItems="center">
          <HStack spacing={1} alignItems="center">
            <Text fontSize="xs">Made with</Text>
            <Text fontSize="xs" color="red">
              ❤️
            </Text>
            <Text fontSize="xs">by Jaime & ChatGPT (GPT-4)</Text>
          </HStack>
          <HStack spacing={1} alignItems="center">
            <Text fontSize="xs">Powered by </Text>
            <GradientText
              color1="#49EBBF"
              color2="#20BDFF"
              color3="#4068FF"
              href="https://venusstars.io"
            >
              VenusStars
            </GradientText>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

export const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();  
  const clearResults = () => {
    setData([]);
  };

  async function scanAddress(accountAddress: string) {
    setIsLoading(true);
    const targetMethodId = "0x095ea7b3";
    const json1Url =
      "https://raw.githubusercontent.com/J1Mtonic/BeSAFU/main/FakePhishing.json";
    const getBep20AccountTxlist =
      "https://api.bscscan.com/api?module=account&action=txlist&address=";
    const getBep20AccountParams = "&startblock=0&endblock=99999999";
    const bscscanAPI = "&apikey=J5HERDUSE8HWU7HISSURZY1349VBWHX31F";
    const json2Url =
      getBep20AccountTxlist +
      accountAddress +
      getBep20AccountParams +
      bscscanAPI;

    interface Transaction {
      methodId: string;
      input: string;
      to: string;
      hash: string;
      blockNumber: string;
    }

    try {
      const json1 = await fetch(json1Url).then((res) => res.json());
      const json2 = await fetch(json2Url).then((res) => res.json());
      const scamAddresses = new Set<string>(
        json1.map((entry: { address: string }) => entry.address.toLowerCase())
      );

      let foundAddresses = json2.result.filter((transaction: Transaction) => {
        return (
          transaction.methodId.toLowerCase() === targetMethodId &&
          Array.from(scamAddresses).some((address: string) =>
            transaction.input.toLowerCase().includes(address.slice(2))
          )
        );
      });

      foundAddresses = foundAddresses.filter(
        (transaction: Transaction, index: number, self: Transaction[]) => {
          const sameToAndInputPrefix = self.filter((other: Transaction) => {
            return (
              other.to.toLowerCase() === transaction.to.toLowerCase() &&
              other.input.slice(0, 74).toLowerCase() ===
                transaction.input.slice(0, 74).toLowerCase()
            );
          });

          const maxBlockNumberTransaction = sameToAndInputPrefix.reduce(
            (prev, curr) => {
              return parseInt(curr.blockNumber, 10) >
                parseInt(prev.blockNumber, 10)
                ? curr
                : prev;
            },
            sameToAndInputPrefix[0]
          );

          return !(
            maxBlockNumberTransaction &&
            maxBlockNumberTransaction.input.slice(-64).toLowerCase() ===
              "0000000000000000000000000000000000000000000000000000000000000000"
          );
        }
      );

      foundAddresses = foundAddresses.map((transaction: Transaction) => {
        const addressInfo = json1.find((entry: { address: string }) =>
          transaction.input
            .toLowerCase()
            .includes(entry.address.toLowerCase().slice(2))
        );

        return {
          hash: transaction.hash,
          to: transaction.to,
          address: addressInfo.address,
          nameTag: addressInfo.nameTag,
          reporter: addressInfo.reporter,
        };
      });

      if (foundAddresses.length === 0) {
        toast({
          title: "No signed Scam Contracts found!",
          description:
            "Everything looks good, just consider our Database might be outdated.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Signed Scam Contracts found!",
          description: "Please consider to use a Revoke tool ASAP.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setData(foundAddresses);
    } catch (error) {
      toast({
        title: "Error fetching data",
        description:
          "An error occurred while fetching data. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <ChakraProvider theme={theme}>
      <Grid templateRows="auto 1fr auto" minH="100vh">
        <HeaderButtons />        
        <SimpleGrid columns={1} spacingY={50}>
          <Box height="100px" />
          <Box
            textAlign="center"
            fontSize="xl"
            width={{ base: "90%", md: "auto" }}
            mx="auto"
          >
            <VStack spacing={4}>
              <Flex alignItems="center">
                <Logo />
                <h1
                  style={{
                    fontSize: "48px",
                    marginLeft: "15px",
                    fontWeight: "bold",
                  }}
                >
                  BeSAFU!
                </h1>
              </Flex>
              <SearchBar
                onSearch={scanAddress}
                isLoading={isLoading}
                onClear={clearResults}
              />
            </VStack>
          </Box>
          <Box
            width="100%"
            alignSelf="center"
          >
            {data.length > 0 && (
              <Box overflowY="auto" maxW="100%">
                <DataTable data={data} />
              </Box>
            )}
          </Box>
        </SimpleGrid>
        <Flex mt="auto" flexGrow={0}>
          <Box width="100%">
            <Footer />
          </Box>
        </Flex>
      </Grid>
    </ChakraProvider>
  );  
};
