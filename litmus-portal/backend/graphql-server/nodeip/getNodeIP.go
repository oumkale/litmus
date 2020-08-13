package main

import (
	"flag"
	"fmt"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)
/*
func CreateHelperPod(experimentsDetails *experimentTypes.ExperimentDetails, clients clients.ClientSets, appName, appNodeName string) error {

	mountPropagationMode := apiv1.MountPropagationHostToContainer
	privileged := true

	helperPod := &apiv1.Pod{
		ObjectMeta: v1.ObjectMeta{
			Name:      "disk-fill-" + experimentsDetails.RunID,
			Namespace: experimentsDetails.ChaosNamespace,
			Labels: map[string]string{
				"app":      "disk-fill",
				"name":     "disk-fill-" + experimentsDetails.RunID,
				"chaosUID": string(experimentsDetails.ChaosUID),
			},
		},
		Spec: apiv1.PodSpec{
			RestartPolicy: apiv1.RestartPolicyNever,
			NodeName:      appNodeName,
			Volumes: []apiv1.Volume{
				{
					Name: "udev",
					VolumeSource: apiv1.VolumeSource{
						HostPath: &apiv1.HostPathVolumeSource{
							Path: experimentsDetails.ContainerPath,
						},
					},
				},
			},
			Containers: []apiv1.Container{
				{
					Name:            "disk-fill",
					Image:           experimentsDetails.LIBImage,
					ImagePullPolicy: apiv1.PullAlways,
					Args: []string{
						"sleep",
						"10000",
					},
					VolumeMounts: []apiv1.VolumeMount{
						{
							Name:             "udev",
							MountPath:        "/diskfill",
							MountPropagation: &mountPropagationMode,
						},
					},
					SecurityContext: &apiv1.SecurityContext{
						Privileged: &privileged,
					},
				},
			},
		},
	}

	_, err := clients.KubeClient.CoreV1().Pods(experimentsDetails.ChaosNamespace).Create(helperPod)
	return err
}
*/
// GetIP function is to provide Node IP addresses
func GetIP() {
	fmt.Println("GetIP called")
	// Require variables declared
	var kubeconfig *string
	//nodeAddresses := []corev1.NodeAddress{}
	

	// To get In-CLuster config
	config, err := rest.InClusterConfig()
	fmt.Println("Incluster called")
	
	// If In-Cluster is nil then it will go for Out-Cluster config
	if config == nil {
		
		fmt.Println("config==nil")
		
		//To get Out-Cluster config
		if home := homedir.HomeDir(); home != "" {
			kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "kubeconfig file it is out-of-cluster")
		} else {
			kubeconfig = flag.String("kubeconfig", "", "Path to the kubeconfig file")
		}
		fmt.Println("kubeconfig :", kubeconfig)
		
		//panic(err.Error())
		flag.Parse()

		// uses the current context in kubeconfig
		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			fmt.Println("congig err")
			panic(err.Error())
		}
	}
    
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	//pod := CreateHelperPod()

	pod, err := clientset.CoreV1().Pods("litmus").Get("nnn", metav1.GetOptions{})
	pod, err := clientset.CoreV1().Pods("litmus").List(metav1.GetOptions{LabelSelector:})
	if err != nil {
		panic(err.Error())
	}
	//fmt.Println("pod :",pod)
	nodeName := pod.Spec.NodeName
    //fmt.Println("nodeName :",nodeName)
	node, err := clientset.CoreV1().Nodes().Get(nodeName, metav1.GetOptions{})
	//fmt.Println("node :",node)
	
	address := node.Status.Addresses
	fmt.Println("address :",address)
	
	value1 := ""
	value2 := ""

	for _, addr := range address{
		fmt.Println("--")
	
		if addr.Type == "ExternalIP" && addr.Address != "" {
			value1 = addr.Address
		} else if addr.Type == "InternalIP" && addr.Address != ""{
			value2 = addr.Address
		}
	}  
		
	if value1 == "" {
		value1 = value2
	}	
	fmt.Println(value1)
}

func main() {
	fmt.Println("Start")
	GetIP()

}
