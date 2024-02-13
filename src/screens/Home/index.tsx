import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, Alert, Platform } from 'react-native';

import Purchases, { PurchasesPackage } from 'react-native-purchases';
const REVENUECAT_API_KEY =
  Platform.OS === 'ios'
    ? 'appl_SrnFQeNPnPpnahcBMvyDVAVOCmZ'
    : 'goog_wFlTPTxXqrFcFKAYsMPDRGkGEcy';

const HomeScreen = () => {
  const [initialized, setInitialized] = useState(false);
  const [products, setProducts] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    (async () => {
      try {
        Purchases.configure({ apiKey: REVENUECAT_API_KEY });
        setInitialized(true);
      } catch (e: any) {
        console.log('Initialize error: ', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (initialized) {
        try {
          const offerings = await Purchases.getOfferings();
          if (
            offerings.current !== null &&
            offerings.current?.availablePackages !== null
          ) {
            setProducts(offerings.current.availablePackages);
          }
        } catch (e: any) {
          console.log('getOfferings error: ', e);
          console.log('getOfferings error message: ', e.message);
        }
      }
    })();
  }, [initialized]);

  return (
    <SafeAreaView style={styles.container}>
      {products.map(p => {
        return (
          <View key={p.product.identifier} style={styles.box}>
            <Text>{p.offeringIdentifier}</Text>
            <Text>{p.identifier}</Text>
            <Text>{p.product.title}</Text>
            <Text>{p.product.description}</Text>
            <Text>{p.product.priceString}</Text>
            <Button
              title="상품 구매"
              onPress={async () => {
                try {
                  const result = await Purchases.purchasePackage(p);
                  console.log('result', result);
                  Alert.alert('구매성공');
                } catch (e: any) {
                  if (!e.userCancelled) {
                    Alert.alert('구매 실패', e.message);
                  }
                }
              }}
            />
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
